'''
Denne koden brukes kun til å lage vector-embeddings av en json fil som kan brukes til RAG for chatboten.
Den skal kun kjøres når det gjøres oppdateringer av dataen i json filen.
'''

import json, os
from openai import OpenAI
from dotenv import load_dotenv

# Laste inn API-key og lage OpenAI-klient
dotenv_path = os.path.join(os.path.dirname(__file__), '..', '.env.local')
load_dotenv(dotenv_path, override=True)
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Hent data fra data.json
script_dir = os.path.dirname(os.path.abspath(__file__))
data_path = os.path.join(script_dir, '..', 'data', 'raw_data.json')
with open(data_path, 'r', encoding='utf-8') as f:
    data = json.load(f)
courses = data['courses']

# Data gjøres klar for chunking
def create_course_chunks(course):
    chunk = f'''
Emnekode: {course['emnekode']}
Navn: {course['navn']}
Beskrivelse: {course['beskrivelse']}
Studiepoeng: {course['studiepoeng']}
Semester: {', '.join(course['semester'])}
Krav til forkunnskaper: {', '.join(course['krav_til_forkunnskaper']) if course['krav_til_forkunnskaper'] else 'Ingen'}
Anbefalte forkunnskaper: {', '.join(course['anbefalte_forkunnskaper']) if course['anbefalte_forkunnskaper'] else 'Ingen'}
Studiepoengreduksjon: {', '.join(course['studiepoengreduksjon']) if course['studiepoengreduksjon'] else 'Ingen'}
Undervisningsformer: {course['undervisningsformer'] or 'Ingen'}
Obligatorisk undervisningsaktivitet: {course['obligatorisk_undervisningsaktivitet'] or 'Ingen'}
Vurderingsformer: {course['vurderingsformer'] or 'Ingen'}
Kategori: {', '.join(course['kategori']) if course['kategori'] else 'Ingen'}
Obligatorisk/valgemne: {course['obligatorisk/valgemne'] or 'Ingen'}
'''
    return chunk.strip()

chunks = [create_course_chunks(c) for c in courses]

embeddings = []

# Her gjøres den faktiske embeddingen
for chunk in chunks:
    response = client.embeddings.create(
        model = 'text-embedding-3-small',
        input = chunk
    )

    embeddings.append({
        'text': chunk,
        'embedding': response.data[0].embedding
    })

# Lagre embedded data til coruse_embeddings.json
fp = os.path.join(script_dir, '..', 'data', 'embedded_data.json')
with open(fp, 'w', encoding='utf-8') as f:
    json.dump(embeddings, f, ensure_ascii=False, indent=2)