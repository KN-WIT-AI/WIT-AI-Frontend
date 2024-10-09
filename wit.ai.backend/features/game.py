import random
from infrastructure import openai_client as oai

nouns = [
    "dom", "kot", "pies", "drzewo", "samochód", "rower", "książka", "komputer", "telefon", "długopis", 
    "stół", "krzesło", "lampa", "chmura", "morze", "góry", "rzeka", "jezioro", "człowiek", "kobieta", 
    "mężczyzna", "dziecko", "miasto", "wieś", "ogród", "kwiat", "owoc", "warzywo", "butelka", "talerz", 
    "kubek", "garnek", "szafa", "biurko", "okno", "drzwi", "klucz", "parasol", "zegarek", "portfel", 
    "kapelusz", "buty", "torba", "plecak", "pociąg", "autobus", "samolot", "statek", "ręka", "noga", 
    "głowa", "serce", "nos", "oko", "ucho", "włosy", "palec", "zęby", "język", "skóra", "kwiat", "ptak", 
    "ryba", "słoń", "lew", "tiger", "koń", "krowa", "świnia", "owca", "kura", "kaczka", "zając", 
    "żaba", "motyl", "pająk", "mrówka", "komar", "pszczoła", "trawa", "liść", "kora", "kamień", 
    "skała", "piasek", "ziemia", "grzyb", "woda", "powietrze", "ogień", "słońce", "księżyc", 
    "gwiazda", "planeta", "kosmos", "niebo", "tęcza", "wiatr", "burza", "śnieg", "deszcz", 
    "mróz", "mgła", "szron", "jaskinia", "las", "pustynia", "plaża", "wyspa", "kontynent", 
    "państwo", "miasto", "ulica", "dom", "mieszkanie", "pokój", "kuchnia", "łazienka", 
    "piwnica", "garaż", "schody", "balkon", "taras", "dach", "ogród", "park", "las", 
    "pole", "łąka", "rzeka", "jezioro", "staw", "morze", "ocean", "półwysep", "zatoka", 
    "góra", "wzgórze", "klify", "skały", "jaskinia", "przepaść", "dolina", "kanion", 
    "wulkan", "lodowiec", "śnieg", "sztorm", "tajfun", "tornado", "huragan", "powódź", 
    "pożar", "trzęsienie ziemi", "lawina", "osuwisko", "burza", "grad", "mróz", "upadek", 
    "zderzenie", "kolizja", "wypadek", "katastrofa", "zalanie", "wybuch", "eksplozja", 
    "palenie", "dym", "popiół", "pożoga", "zagłada", "kataklizm", "epidemia", "pandemia", 
    "zaraza", "infekcja", "choroba", "leczenie", "operacja", "zabieg", "rehabilitacja", 
    "zdrowie", "lekarz", "pielęgniarka", "apteka", "szpital", "klinika", "gabinet", 
    "laboratorium", "przychodnia", "karetka", "pogotowie", "ratownik", "naukowiec", 
    "inżynier", "nauczyciel", "policjant", "strażak", "żołnierz", "kucharz", "kelner", 
    "fryzjer", "mechanik", "elektryk", "hydraulik", "malarz", "tancerz", "aktor", "reżyser", 
    "muzyk", "pisarz", "poeta", "artysta", "malarz", "rzeźbiarz", "architekt", "projektant", 
    "konstruktor", "naukowiec", "filozof", "historyk", "geograf", "biolog", "chemik", 
    "fizyk", "matematyk", "astronom", "kosmonauta", "astronauta", "robotyk", "informatyk"
]


def generate_pin(length=4):
    return ''.join(random.choices('0123456789', k=length))

def getPIN():
    return nouns[random.randint(0, nouns.__sizeof__)]