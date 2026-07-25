from app.services.chunking_service import chunk_text

sample_text = "A" * 2500

chunks = chunk_text(
    sample_text,
    chunk_size=1000,
    chunk_overlap=200,
)

print(f"Number of chunks: {len(chunks)}")

for index, chunk in enumerate(chunks, start=1):
    print(f"Chunk {index}: {len(chunk)} characters")