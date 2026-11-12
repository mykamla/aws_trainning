/** Cours d’introduction — couvre tous les thèmes des 12 modules du quiz. */

export interface CourseSection {
  id: string
  moduleHint: string
  title: string
  lead: string
  points: string[]
  remember?: string
}

export const COURSE_INTRO = {
  title: 'Cours AWS Lambda',
  subtitle:
    'Avant les questions : les concepts couverts par les 12 modules (~128 Q). Lisez chaque section, puis passez au quiz.',
}

export const COURSE_SECTIONS: CourseSection[] = [
  {
    id: 'execution',
    moduleHint: 'Module 1',
    title: 'Modèle d’exécution',
    lead:
      'Lambda exécute votre code dans un environnement d’exécution isolé (microVM), géré par AWS. Vous ne patcher pas l’OS.',
    points: [
      'Le handler est le point d’entrée (fichier.méthode) appelé à chaque invocation avec event + context.',
      'Une instance d’environnement traite une seule invocation à la fois ; la concurrence = plusieurs instances.',
      'Placez l’init coûteuse (SDK, connexions) hors du handler pour la réutiliser en warm.',
      'Le context expose requestId, ARN, mémoire, getRemainingTimeInMillis() — le métier est dans l’event.',
      '/tmp est éphémère et local à l’instance (réutilisable en warm, pas durable). Timeout max : 15 minutes.',
      'Les permissions vers AWS passent par le rôle d’exécution IAM (execution role).',
    ],
    remember: 'Stateless par conception : ne comptez pas sur un process éternel.',
  },
  {
    id: 'cold-starts',
    moduleHint: 'Module 2',
    title: 'Cold starts & warm',
    lead:
      'Un cold start crée/charge un nouvel environnement (runtime + code + extensions) avant la première requête.',
    points: [
      'Après inactivité ou scale-out, de nouveaux environnements démarrent → latence d’init.',
      'Warm = environnement réutilisé (freeze/thaw) : le code module n’est pas réexécuté.',
      'Packages/layers lourds, VPC (historique), extensions et JVM allongent souvent l’init.',
      'Provisioned concurrency pré-initialise un pool pour réduire les cold starts (coût).',
      'SnapStart (runtimes éligibles, ex. Java) snapshot l’état initialisé pour accélérer les starts.',
      'Pas de garantie de durée d’un environnement idle ; AWS peut recycler.',
    ],
    remember: 'Mesurez Init Duration vs Duration dans les logs REPORT.',
  },
  {
    id: 'concurrency',
    moduleHint: 'Module 3',
    title: 'Concurrence',
    lead:
      'La concurrence régionale est partagée. Reserved et provisioned sont deux leviers distincts.',
    points: [
      'Reserved concurrency : plafond (et réserve) pour une fonction ; 0 = plus d’invocations.',
      'Provisioned concurrency : environnements prêts (latence) — souvent sur un alias, pas $LATEST.',
      'Throttle sync → erreur à l’appelant (ex. 429) ; avec SQS les messages sont retentés selon config.',
      'Métrique clé : Throttles (+ ConcurrentExecutions). Burst limite la vitesse de scale-out initial.',
      'Reserved trop haute affame le pool non réservé des autres fonctions.',
      'Pour protéger une DB : reserved calibrée + file SQS pour lisser (backpressure).',
    ],
    remember: 'Reserved ≥ provisioned quand les deux sont utilisés.',
  },
  {
    id: 'triggers-http',
    moduleHint: 'Module 4',
    title: 'Triggers HTTP',
    lead:
      'API Gateway, ALB et Function URLs exposent Lambda en HTTP — avec des contrats d’event différents.',
    points: [
      'API Gateway REST : timeout d’intégration ~29 s (même si Lambda va jusqu’à 15 min).',
      'Event typique : méthode, headers, path, query, body (souvent string à parser ; isBase64Encoded).',
      'Proxy integration : renvoyer { statusCode, headers, body }.',
      'Function URL : HTTPS direct (auth NONE ou AWS_IAM) — simple, moins de features qu’API GW.',
      'ALB peut cibler Lambda ; le format d’event n’est pas celui d’API GW.',
      'Permission resource-based pour autoriser apigateway/ALB à invoquer ; gérer CORS (OPTIONS).',
    ],
    remember: 'Jobs longs → async (SQS / Step Functions), pas HTTP sync.',
  },
  {
    id: 'triggers-events',
    moduleHint: 'Module 5',
    title: 'Triggers événements',
    lead:
      'S3, EventBridge et SNS découplent producteurs et consommateurs en mode asynchrone.',
    points: [
      'S3 ObjectCreated → Lambda (ou SNS/SQS/EventBridge) ; filtres préfixe/suffixe pour limiter le bruit.',
      'La notif S3 est async : l’échec Lambda n’annule pas le PutObject — visez l’idempotence.',
      'EventBridge invoque Lambda en async ; content filtering sur les patterns d’event.',
      'Schedules cron/rate (EventBridge / Scheduler) pour les déclenchements périodiques.',
      'SNS → Lambda : event avec Records[].Sns ; fan-out classique vers plusieurs cibles.',
      'Cross-account : bus policy + permission Lambda (SourceAccount / SourceArn).',
    ],
    remember: 'URL-decodez les clés S3 (espaces, + / %20).',
  },
  {
    id: 'triggers-queues',
    moduleHint: 'Module 6',
    title: 'Files & streams',
    lead:
      'SQS et DynamoDB/Kinesis Streams utilisent un event source mapping (poller managé).',
    points: [
      'SQS → Lambda : batch size, windowing, concurrence du mapping ; pas de webhook SQS natif.',
      'ReportBatchItemFailures : ne retenter que les messages échoués (sinon tout le batch).',
      'Visibility timeout trop court vs durée Lambda → double traitement.',
      'DLQ SQS après maxReceiveCount ; alarmer la profondeur DLQ.',
      'Standard = at-least-once, ordre best-effort ; FIFO = ordre/dedup par MessageGroupId.',
      'DynamoDB Streams : IteratorAge = lag ; ordre par shard ; bisect on error pour poison records.',
    ],
    remember: 'Un seul MessageGroupId FIFO = goulot de parallélisme.',
  },
  {
    id: 'iam-vpc-config',
    moduleHint: 'Module 7',
    title: 'IAM, VPC & configuration',
    lead:
      'Sécurité et réseau : qui assume le rôle, où tourne la fonction, comment configurer le code.',
    points: [
      'Trust : lambda.amazonaws.com assume le rôle ; credentials temporaires injectées.',
      'AWSLambdaBasicExecutionRole ≈ logs CloudWatch ; ajoutez policies métier (S3, DynamoDB…).',
      'Resource-based policy : qui peut invoquer (S3, APIGW, comptes).',
      'VPC seulement si besoin de ressources privées ; SG sur l’ENI ; NAT ou VPC endpoints pour l’egress.',
      'Env vars : config (KMS possible) — secrets via Secrets Manager/SSM + rotation, pas en clair loggé.',
      'Layers sous /opt pour deps partagées ; limite ~250 Mo unzipped zip+layers (images jusqu’à ~10 Go).',
    ],
    remember: 'IAM ≠ firewall : un SG mal ouvert fait timeout DB même avec les bonnes policies.',
  },
  {
    id: 'packaging-versions',
    moduleHint: 'Module 8',
    title: 'Packaging, versions & alias',
    lead:
      'Déployez un zip ou une image OCI ; figez avec versions et routez avec des alias.',
    points: [
      'Zip (upload/S3) ou image ECR ; handler selon runtime (Node index.handler, Python module.func…).',
      'provided.al2 / custom runtime via bootstrap pour langages non fournis.',
      'Architecture x86_64 vs arm64 (Graviton) : libs natives doivent matcher.',
      '$LATEST est mutable ; versions numérotées immuables — prod via alias → version.',
      'Alias weighted : canary / blue-green entre deux versions.',
      'Provisioned concurrency se rattache proprement à un alias (pipeline publish → update alias).',
    ],
    remember: 'Ne pointez pas les clients prod sur $LATEST.',
  },
  {
    id: 'perf-pricing',
    moduleHint: 'Module 9',
    title: 'Performance, timeouts & prix',
    lead:
      'Mémoire et CPU sont couplés ; la facture suit invocations + GB-secondes (+ extras).',
    points: [
      'Plus de mémoire → plus de CPU → durée souvent plus courte ; profilez le sweet spot coût/latence.',
      'Timeout dépassé → Task timed out ; retries selon le mode d’invocation.',
      'getRemainingTimeInMillis() pour checkpoint avant timeout.',
      'Storage /tmp configurable jusqu’à 10 Go (coût au-delà du inclus) ; durable = S3/EFS.',
      'Pricing : requests + durée × mémoire ; provisioned concurrency facture aussi l’idle.',
      'ARM/Graviton et filtrage d’events réduisent souvent la facture ; REPORT : Max Memory Used.',
    ],
    remember: 'Aligner timeouts de toute la chaîne (APIGW 29 s ≠ Lambda 15 min).',
  },
  {
    id: 'retries-obs',
    moduleHint: 'Module 10',
    title: 'Retries, DLQ, events & observabilité',
    lead:
      'Fiabilité async + corrélation des logs : destinations, DLQ, CloudWatch, X-Ray.',
    points: [
      'Async : retries intégrés puis onFailure (destinations SQS/SNS/EventBridge/Lambda) ou DLQ.',
      'Handlers idempotents : at-least-once et retries rejouent les side effects.',
      'Logs stdout → /aws/lambda/<name> ; structured logging + awsRequestId.',
      'Ligne REPORT : Duration, Init Duration, mémoire utilisée, billed duration.',
      'X-Ray : traces segments/subsegments — permissions xray + sampling raisonnable.',
      'Lambda Insights / extensions : métriques système ; overhead d’init à mesurer.',
    ],
    remember: 'Sans partial failure SQS, un poison message rejoue tout le lot.',
  },
  {
    id: 'mock-themes',
    moduleHint: 'Modules 11–12',
    title: 'Thèmes des examens blancs',
    lead:
      'Les mocks mélangent architecture et pièges : chaînez correctement sync/async, VPC, canary et files.',
    points: [
      'API sync + RDS privée : API GW → Lambda en VPC + Secrets Manager (pas RDS publique).',
      'Traitement long (ex. 8 min) : S3 → SQS → Lambda / Step Functions, pas APIGW sync.',
      'Throttles : augmenter concurrence / lisser via SQS — pas couper les logs.',
      'Canary : alias weighted ; PC sur la bonne version/alias après publish.',
      'État module mutable = fuite entre invocations warm ; idempotence obligatoire en async.',
      'IteratorAge haut, cross-account S3, layers trop gros, X-Ray sans IAM, SG sans egress RDS : pièges classiques.',
    ],
    remember: 'Toujours raisonner bout-en-bout : trigger → timeout → retries → observabilité.',
  },
]
