
# IOtech.lt
IOtech.lt - kompiuterių technikos parduotuvė

# Kaip paleisti svetainę

## Serverio pusė (backend)

1. Klonuoti git repositoriją `git clone https://AirisRX/IOTech.lt`
2. Įrašyti python https://www.python.org/downloads/
3. Pakeisti direktoriją į backend `cd backend/`
4. Pasidaryti virtualią pythono aplinką ir ją paleisti https://docs.python.org/3/library/venv.html 
5. Įrašyti reikalingas pythono bibliotekas `pip install -r requirements.txt`
6. Galima dabar paleisti svetainę `python -m flask run`

## Vartotojo sąsąja (frontend)

7. Įrašyti nodejs ir npm https://nodejs.org/en/download/
8. Pakeisti direktoriją į frontend `cd frontend`
9. Įrašyti reikalingas node bibliotekas `npm install`
10. Paleisti svetainę (frontend dalį)`npm run dev`
11. Atsidaryti adresą http://localhost:3000/

Produkcijos paleidimo dar nėra, kadangi demonstracinė svetainė  
Taip pat yra padaryti dockerio failai, bet neužtikrintas jų veikimas

