from __future__ import annotations

import subprocess
import shutil
import sys
from pathlib import Path


WORKSPACE = Path(__file__).resolve().parents[3]
PNPM = shutil.which("pnpm") or "pnpm"
COMMANDS = (
    (PNPM, "exec", "vitest", "run", "tests/assets/visual-production.test.ts"),
    (PNPM, "run", "typecheck"),
)


def main() -> int:
    sys.stdout.reconfigure(errors="replace")
    for command in COMMANDS:
        completed = subprocess.run(
            command,
            cwd=WORKSPACE,
            check=False,
            capture_output=True,
            encoding="utf-8",
            errors="replace",
            text=True,
        )
        if completed.stdout:
            print(completed.stdout, end="")
        if completed.stderr:
            print(completed.stderr, end="")
        if completed.returncode != 0:
            return completed.returncode
    return 0


if __name__ == "__main__":
    sys.exit(main())
