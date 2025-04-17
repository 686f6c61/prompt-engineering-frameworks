"""
prompt_formatter.py

Utility to format raw prompts into readable Markdown.
"""
import re


def format_prompt_markdown(raw_prompt: str) -> str:
    """
    Convert a raw prompt string with 'Key: Value' segments into structured Markdown.

    - Inserts blank lines before each section heading.
    - Bolds the headings.
    """
    # Insert blank lines before each new section starting with TitleCase and colon
    formatted = re.sub(r"\.\s+(?=[A-Z][a-z]+:)", ".\n\n", raw_prompt)
    # Bold section headings
    formatted = re.sub(r"^([A-Z][a-zA-Z ]+):", r"**\1**:", formatted, flags=re.MULTILINE)
    return formatted.strip()
