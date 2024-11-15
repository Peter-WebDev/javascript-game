# En interaktiv upplevelse

## Uppgiften i korthet

Skapa en interaktiv upplevelse där användaren kan göra förändringar i en värld.

## The Forest - A tale from the woods

Uppvuxen relativt nära Tiveden (sedan 1983 en nationalpark som ligger i skogsområdet Tiveden) med dess tunga skog, grottor och stora stenblock kombinerat med sagor från bland annat [Bland Tomtar och Troll](https://sv.wikipedia.org/wiki/Bland_tomtar_och_troll) kändes det självklart att skapa en interaktiv upplevese på det temat.

Länk till Github Pages [The Forest - A tale from the woods](https://peter-webdev.github.io/javascript-game/)

## Utmaningar

### localStorage

Största utmaningen var nog utan tvekan att få till rätt struktur och koppling med `localStorage` och att få till att de olika scenerna höll sig kvar. Med lite handledning så gick det upp ett litet ljus, som gjorde att jag förstod lite bättre hur det hela hänger ihop.

### Ljud

En annan utmaning handlade om ljud och främst att kunna tona ut ljudet vid bestämt läge. Här testade jag från alla möjliga håll och hittade tillslut nån fungerande lösning. Samtidigt märkte jag att ljudet sänktes för båda ljudfiler jag använder, så när ena ljudet tonades ut hördes knappt den andra ljudfilen. Insåg då att filerna låg fel i min `gameState` där jag hade lagt båda filerna i varsin curly brackets `[]`. Efter jag justerade det fungerade det rätt bra och kunde finjustera `setInterval` för att få till en så mjuk uttoning.

### Commit

En tredje utmaning gäller commit. Det var i början lätt att fixa flera saker samtidigt om det så var i JavaScript, CSS eller HTML innan jag såg till göra en commit.

## Lärdomar och funderingar

Det hade underlättat om jag brutit ned de olika uppgifterna till små stories och inte dra iväg med flera på en gång. Att få på plats vissa delar först. Och även att se över kring Scope, det vill säga vad som behöver vara globalt och vad som kan lokalt vad som behöver vara globalt.
