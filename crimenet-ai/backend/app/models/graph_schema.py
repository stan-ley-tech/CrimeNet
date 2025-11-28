from dataclasses import dataclass
from pathlib import Path

@dataclass
class Node:
    label: str
    id: str
    props: dict

@dataclass
class Relationship:
    src: str
    dst: str
    type: str
    props: dict

class GraphSchema:
    @staticmethod
    def sample_paths(source: str | None):
        base = Path(__file__).resolve().parents[3] / "data"
        files = []
        if source in (None, "financial"):
            files.append(str(base / "financial.csv"))
        if source in (None, "telecom"):
            files.append(str(base / "telecom.csv"))
        if source in (None, "mobility"):
            files.append(str(base / "mobility.csv"))
        if source in (None, "corporate"):
            files.append(str(base / "corporate.csv"))
        if source in (None, "wepesi"):
            files.append(str(base / "wepesi_demo.json"))
        return files
