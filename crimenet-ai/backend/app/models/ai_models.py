class Embeddings:
    def __init__(self):
        self.vectors = {}

    def get(self, key: str):
        return self.vectors.get(key)

    def set(self, key: str, vec):
        self.vectors[key] = vec
