import random
from infrastructure import openai_client as oai

def generate_pin(length=4):
    return ''.join(random.choices('0123456789', k=length))

