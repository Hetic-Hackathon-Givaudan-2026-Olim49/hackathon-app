import express from 'express';
import pg from 'pg';

try {
  process.loadEnvFile();
} catch {
  // Pas de .env : on garde l'environnement tel quel
}

const { DATABASE_URL, DATA_API_URL } = process.env;

const PORT = Number(process.env.PORT ?? 3000);

const db = new pg.Pool({
  connectionString: DATABASE_URL,
});

const app = express();

app.use(express.json());

app.get('/api/health', async (_req, res) => {
  const { rows } = await db.query('SELECT version()');

  res.json({
    status: 'ok',
    db: rows[0].version,
  });
});

app.get('/api/questions', async (_req, res) => {
  const { rows } = await db.query(
    'SELECT * FROM questions ORDER BY id DESC LIMIT 10',
  );

  res.json(rows);
});

app.post('/api/questions', async (req, res) => {
  const question = String(req.body?.question ?? '').trim();

  if (!question) {
    res.status(400).json({
      error: 'Question manquante',
    });
    return;
  }

  const answer = await ask(question);

  const { rows } = await db.query(
    'INSERT INTO questions (question, answer) VALUES ($1, $2) RETURNING *',
    [question, answer],
  );

  res.status(201).json(rows[0]);
});

type DataOpportunity = {
  entreprise?: string;
  type_opportunite?: string;
  division_givaudan?: string;
  hypothese?: string;
  fenetre_action?: string;
  question_client?: string;
  confiance?: string;
};

type DataEntreprise = {
  nom?: string;
};

type DataFiche = {
  ce_que_ca_implique?: string;
  entreprise?: DataEntreprise;
  opportunite?: DataOpportunity;
  question_a_poser?: string;
  confiance?: string;
};

type DataResponse = {
  mode?: string;
  fiches?: DataFiche[];
};

function fallback(question: string): string {
  return `[SIMULATION IA] Synthèse simulée pour la question : "${question}". L'API Data n'est pas disponible.`;
}

async function ask(question: string): Promise<string> {
  if (!DATA_API_URL) {
    return fallback(question);
  }

  try {
    const response = await fetch(`${DATA_API_URL}/opportunities?dummy=true`, {
      headers: {
        Accept: 'application/json',
        'ngrok-skip-browser-warning': '1',
      },
    });

    if (!response.ok) {
      throw new Error(`Data API : ${response.status}`);
    }

    const data = (await response.json()) as DataResponse;
    const fiche = data.fiches?.[0];

    if (!fiche) {
      throw new Error('Aucune opportunité retournée par la Data API');
    }

    const entreprise =
      fiche.entreprise?.nom ??
      fiche.opportunite?.entreprise ??
      'Entreprise non précisée';

    const implication =
      fiche.ce_que_ca_implique ?? 'Aucune implication commerciale disponible.';

    const opportunite =
      fiche.opportunite?.hypothese ??
      'Aucune hypothèse d’opportunité disponible.';

    const questionClient =
      fiche.question_a_poser ??
      fiche.opportunite?.question_client ??
      'Aucune question client proposée.';

    const confiance =
      fiche.confiance ?? fiche.opportunite?.confiance ?? 'non précisée';

    return [
      '[DATA API - MODE DUMMY]',
      `Entreprise : ${entreprise}`,
      `Impact : ${implication}`,
      `Opportunité : ${opportunite}`,
      `Question à poser au client : ${questionClient}`,
      `Confiance : ${confiance}`,
    ].join('\n');
  } catch (error) {
    console.error('API Data indisponible, utilisation du fallback :', error);
    return fallback(question);
  }
}

app.listen(PORT, () => {
  console.log(`API sur http://localhost:${PORT}`);
});
