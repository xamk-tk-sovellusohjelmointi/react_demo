# React-sovelluksen rakentaminen tekoälyn avulla ja julkaisu GitHub Pagesissa

Tässä esimerkissä käydään läpi yksi tapa käyttää tekoälytyökaluja ohjelmoinnin avustajana. Samassa projektissa käydään myös staattisen React-frontend -sovelluksen julkaisu GitHub Pages -palvelussa. Julkaistua sovellusta voi testata osoitteessa: https://xamk-tk-sovellusohjelmointi.github.io/react_demo/#/tasks

## Sisällysluettelo

- [1. Osaamistavoitteet](#1-Osaamistavoitteet)
- [2. Kloonaus ja käynnistys](#2-kloonaus-ja-käynnistys)
- [3. Projektin rakenne alussa](#3-projektin-rakenne-alussa)
- [4. Osa 1: Sovelluksen ohjelmointi tekoälyn avulla](#4-osa-1-sovelluksen-ohjelmointi-tekoälyn-avulla)
  - [4.1 Claude Code ja työskentelytapa](#41-claude-code-ja-työskentelytapa)
  - [4.2 Vaihe 1: Projektin alustus](#42-vaihe-1-projektin-alustus)
  - [4.3 Vaihe 2: MUI, reititys ja uutiskirjelomake](#43-vaihe-2-mui-reititys-ja-uutiskirjelomake)
  - [4.4 Vaihe 3: Roboto-fontti](#44-vaihe-3-roboto-fontti)
  - [4.5 Vaihe 4: Tehtävälista](#45-vaihe-4-tehtävälista)
  - [4.6 Tekoälyn tuottaman koodin tarkistaminen](#46-tekoälyn-tuottaman-koodin-tarkistaminen)
  - [4.7 Agentin ohjaaminen kehotteiden ulkopuolella](#47-agentin-ohjaaminen-kehotteiden-ulkopuolella)
- [5. Osa 2: Tuotantoversio GitHub Pagesia varten](#5-osa-2-tuotantoversio-github-pagesia-varten)
  - [5.1 Suhteelliset polut Viten asetuksissa](#51-suhteelliset-polut-viten-asetuksissa)
  - [5.2 HashRouter reitityksen pohjaksi](#52-hashrouter-reitityksen-pohjaksi)
  - [5.3 Tuotantoversion rakentaminen](#53-tuotantoversion-rakentaminen)
  - [5.4 Tuotantoversion testaaminen](#54-tuotantoversion-testaaminen)
- [6. Projektin rakenne lopussa](#6-projektin-rakenne-lopussa)
- [7. Julkaisu GitHub Pagesissa](#7-julkaisu-github-pagesissa)
- [8. Yhteenveto](#8-yhteenveto)

## 1. Osaamistavoitteet

Demossa on rakennettu React-sovellus, jossa on etusivu, tietosivu, tehtävälista ja uutiskirjeen tilauslomake. Sovellus on ohjelmoitu **tekoälyavustajan** (AI assistant) avulla. Demo jakautuu kahteen osaan. Aluksi käydään läpi, miten sovellus on rakennettu tekoälyn avulla tyhjästä kansiosta Claude Code -työkalulla. Jokaisesta vaiheesta näytetään käytetty kehote, tekoälyn tekemät toimenpiteet ja syntynyt koodi. Osassa 2 projektiin tehdään muutokset, joita GitHub Pages -julkaisu vaatii, ja sovelluksesta rakennetaan **tuotantoversio** (production build) `dist`-kansioon. Lopuksi `dist`-kansion sisältö julkaistaan GitHub Pagesissa.

Demossa käydään läpi seuraavia aiheita:

- **Kehotteen** (prompt) kirjoittaminen niin, että tekniikat, versiot, tiedostonimet ja rajoitukset on kerrottu yksiselitteisesti
- Vite + React + TypeScript -projektin alustaminen ja esimerkkitiedostojen siivoaminen tekoälyn avulla
- Sovelluksen rakentaminen vaiheittain tekoälyn avulla
- Tekoälyn tuottaman koodin tarkistaminen käännöksellä, koodintarkastuksella ja selaimessa
- Vite-projektin valmistelu staattista julkaisua varten `base`-asetuksella ja `HashRouter`-komponentilla
- Tuotantoversion rakentaminen ja julkaiseminen GitHub Pagesissa

## 2. Kloonaus ja käynnistys

Projekti vaatii Node.js:n version 26 tai uudemman, koska `package.json`-tiedoston `engines`-kentässä on määritelty `"node": ">=26"`. Projektin juuressa oleva `.nvmrc`-tiedosto sisältää versionumeron `26`, joten nvm-versionhallintaa käytettäessä oikea Node.js-versio otetaan käyttöön komennolla `nvm use`.

Kun repositorio on kloonattu ja terminaali on avattu projektin kansiossa, projektin **riippuvuudet** (dependencies) asennetaan ja kehityspalvelin käynnistetään seuraavilla komennoilla.

```bash
npm install
npm run dev
```

Sovellus avautuu osoitteeseen http://localhost:3000/.

Demo on kirjoitettu Node.js:n versiolle 26 sekä Viten versiolle 8, Reactin versiolle 19, TypeScriptin versiolle 7, MUI:n versiolle 9 ja React Routerin versiolle 8. Nämä olivat kirjoitushetkellä kunkin työkalun uusimmat pääversiot.

## 3. Projektin rakenne alussa

Demon rakentaminen aloitettiin kansiosta, jossa oli vain tyhjä `CLAUDE.md`-tiedosto. Claude Code lukee tämän tiedoston jokaisen istunnon alussa, joten siihen voidaan kirjoittaa pysyviä projektikohtaisia ohjeita.

```text
react_demo/
└── CLAUDE.md
```

## 4. Osa 1: Sovelluksen ohjelmointi tekoälyn avulla

### 4.1 Claude Code ja työskentelytapa

Claude Code on Anthropicin tekoälyavustaja, jota käytetään terminaalissa projektin kansiosta käsin. Se toimii **agenttina** (agent), mikä tarkoittaa, että se lukee projektin tiedostoja, ajaa komentoja ja kirjoittaa tiedostot itse. Kehittäjä kirjoittaa kehotteen, jossa kuvataan haluttu lopputulos. Claude tekee muutokset ja kertoo lopuksi raportissa, mitä tehtiin ja mitä tarkistettiin. Seuraava kehote kirjoitetaan raportin ja lopputuloksen perusteella.

Tämän demon sovellus rakennettiin yhdessä Claude Code -keskustelussa neljällä kehotteella, ja osan 2 muutokset tehtiin samassa keskustelussa kolmella lisäkehotteella. Kehotteet kirjoitettiin englanniksi, ja ne on lainattu tässä alkuperäisessä muodossaan. Ohjelmointi nopeutuu, koska Claude ajaa komennot, kirjoittaa tiedostot ja tekee tarkistukset. Kehittäjän työ keskittyy vaatimusten kuvaamiseen ja lopputuloksen arviointiin. Aiheesta lisää: [Claude Coden dokumentaatio](https://code.claude.com/docs/en/overview).

> [!NOTE]
> Ohjeet, joiden halutaan pätevän koko projektissa, kuten käytettävä komponenttikirjasto tai koodityyli, voidaan kirjoittaa `CLAUDE.md`-tiedostoon. Niitä ei silloin tarvitse toistaa jokaisessa kehotteessa. Tässä demossa tiedosto jätettiin tyhjäksi, ja kaikki vaatimukset kirjoitettiin kehotteisiin.

### 4.2 Vaihe 1: Projektin alustus

Ensimmäinen kehote pyytää tyhjän Vite + React + TypeScript -projektin, joka toimii portissa 3000.

```text
Initialize Vite React TypeScript project to this folder and configure it to run in port 3000. Clean up any Vite example files. I want to see a white blank page with no CSS styles with simple "Hello World!" text in h3 element. Use latest Vite release and Node 26
```

Kehote nimeää käytettävät tekniikat, versiot ja portin. Se kuvaa myös lopputuloksen niin tarkasti, että työn onnistuminen on helppo todeta selaimesta, koska sivun pitää olla valkoinen ja tyylitön ja siinä pitää olla vain `h3`-otsikko.

Claude teki vaiheessa seuraavat toimenpiteet.

1. Claude tarkisti koneelle asennetun Node.js:n version (26.13.0) sekä npm-rekisteristä Viten uusimman version (8.3.8) ja `create-vite`-työkalun uusimman version (9.3.4).
2. Koska kansiossa oli jo `CLAUDE.md`-tiedosto, projektipohja luotiin ensin väliaikaiseen kansioon. Sieltä kopioitiin projektikansioon vain tarvittavat tiedostot, jotta `CLAUDE.md` säilyi ennallaan.
3. Viten esimerkkitiedostot jätettiin pois. Näitä olivat `src/App.css`, `src/index.css`, `src/assets`-kansio, `public`-kansio ja projektipohjan oma `README.md`. Samalla `index.html`-tiedostosta poistettiin Viten logoa käyttävä favicon-linkki, ja sivun otsikoksi vaihdettiin `React Demo`.
4. `vite.config.ts`-tiedostoon lisättiin porttiasetus.
5. `package.json`-tiedostoon lisättiin `engines`-kenttä, ja Node.js:n tyyppimäärittelyt (`@types/node`) päivitettiin versioon 26. Projektin juureen luotiin `.nvmrc`-tiedosto.
6. Claude asensi riippuvuudet, rakensi projektin ja ajoi **koodintarkastimen** (linter). Lopuksi se käynnisti kehityspalvelimen ja varmisti, että sivu vastaa portissa 3000.

### 4.3 Vaihe 2: MUI, reititys ja uutiskirjelomake

Toinen kehote laajentaa sovelluksen neljän näkymän sovellukseksi.

```text
Install MUI and create a simple React app with App.tsx as the landing view. Create a simple welcome header and body text to welcome the user to the example app. Add routing using React Router and create navigation bar that points to About.tsx and Form.tsx. About contains a "lorem ipsum" placeholder body text. Form contains a simple newsletter subscription form with name and email fields and subscribe button. When the user subscribes to newsletter, route to ThankYou.tsx which displays the form data from props and a thank you message with a button back to landing page. Every view contains the  navigation bar and routes to any other route (except for the thankyou.tsx page). Don't install any other libraries than React Router and MUI. Don't send form data anywhere (a dummy page). Don't create styles, use MUI defaults only.
```

Kehote nimeää jokaisen näkymän tiedoston ja kertoo, miten tiedot kulkevat lomakkeelta kiitossivulle. Kolme viimeistä lausetta ovat rajoituksia. Niiden tarkoituksena on varmistaa, että tekoälyagentti ei tee mitään ylimääräistä kuten asenna ylimääräisiä kirjastoja, muodosta API-kutsuja lomakkeen tietojen lähettämiseen palvelimelle, jota ei ole olemassa, eikä kirjoittanut omia tyylejä.

> [!NOTE]
> Tekoälyn ohjeistuksessa kannattaa olla tarkkana ja hyödyntää kehotteessa rajoituksia ja odotetun lopputuloksen esimerkkejä. Monesti koko sovelluksen arkkitehtuurin kuvaaminen yhteen kehotteeseen on epäkäytännöllistä ja usein työskennellessä käykin helposti niin, että tyytyy lyhyesti kehottamaan tekoälyä lisäämään jonkin yhden ominaisuuden nopeasti projektiin. Tällainen "vibe koodaus" on nopea tapa prototyypata ominaisuuksia, mutta se voi olla myös hyvin riskialtista. Ilman riittävää kontekstia -- järjestelmän tarkoituksen kuvaamista, arkkitehtuurin, vaatimusmäärittelyn, rajoitusten, versioiden, jne. määrittelyä -- tekoäly päätyy helposti oletuksiin sovelluksen rakenteesta, jotka eivät pidä paikkansa. Tämä voi johtaa helposti siihen, että tekoäly generoi koodia, joka ei sovi muuhun sovellukseen, yrittää kutsua kuvitteellisia funktioita tai kirjastoja tai agenttien tapauksessa pahimmillaan asentaa salaa mitä tahansa kirjastoja nopeuttamaan ominaisuuksien luontia, vaikka samat asiat voisi tehdä itse.
>
>Riittävän kontekstin ja vahvan määrittelyn ja rajoittamisen etu on se, että tekoäly tuottaa varmemmin toivottua lopputulosta vastaavaa koodia, joka vaatii vähemmän tarkastelua ja siivoamista. Toki kaikkea ei voi edes kokenut kehittäjä muistaa mainita tekoälylle jokaisesta rajatapauksesta, joten on hyvä varmistaa kaikki generoitu koodi itsekin.

Claude teki vaiheessa seuraavat toimenpiteet.

1. Claude tarkisti npm-rekisteristä MUI:n (9.5.0) ja React Routerin (8.5.1) uusimmat versiot sekä niiden **vertaisriippuvuudet** (peer dependencies) eli paketit, joita kirjasto tarvitsee toimiakseen.
2. Claude asensi MUI:n, React Routerin ja MUI:n tarvitsemat Emotion-paketit. Emotion on MUI:n tyylimoottori, ja se kuuluu MUI:n viralliseen asennuskomentoon. Claude kertoi raportissaan, miksi Emotion-paketit asennettiin kehotteen rajoituksesta huolimatta.
3. Claude kirjoitti komponentit `NavBar`, `App`, `About`, `Form`, `ThankYou` ja `AppRoutes` sekä päivitti `src/main.tsx`-tiedoston.
4. Ensimmäinen käännös epäonnistui, koska MUI:n versiosta 9 on poistettu `Typography`-komponentin `paragraph`-ominaisuus. Claude korjasi virheen käyttämällä `gutterBottom`-ominaisuutta.
5. Claude testasi sovelluksen ohjelmallisesti ohjatulla Chrome-selaimella. Testi siirtyi näkymästä toiseen, lähetti tyhjän ja täytetyn lomakkeen ja avasi kiitossivun suoraan osoitteella. Lisäksi Claude tarkisti näkymien ulkoasun kuvakaappauksista.

> [!NOTE]
> Huomioi yllä olevasta listasta kohta 4. Claude käytti aluksi väärää komponentin ominaisuutta. Claude Code voi ajaa projektin komentoja itse, joten se rakensi projektin `npm run build` -komennolla, ja TypeScript-kääntäjä tarkisti koodin asennetun MUI 9 -paketin tyyppimäärittelyjä vasten. Käännösvirheen perusteella Claude pystyi korjaamaan virheen automaattisesti ja ilmoittamaan siitä kehittäjälle. Kaikissa tapauksissa käytetty tekoälytyökalu ei kuitenkaan osaa tai kykene toimimaan näin, jolloin riski vanhentuneelle tai rikkinäiselle koodille on todellinen. Tämän takia on tärkeää, että kehittäjä myös itse seuraa tekoälyn generoimia vastauksia ajatuksella, koska tällaiset virheet lipsahtavat helposti tuotantosovellukseen ja aiheuttavat ongelmia.

Kohdan 4 käännösvirhe näytti seuraavalta (lyhennetty).

```text
src/About.tsx(9,35): error TS2769: No overload matches this call.
  The last overload gave the following error.
    Type '{ variant: "body1"; paragraph: true; children: string; }' is not assignable to type ...
      Property 'paragraph' does not exist on type ...
```

Claude kirjoitti ensin `paragraph`-ominaisuuden, jota vanhemmissa MUI-esimerkeissä käytetään yleisesti. Tekoälyn tuottama koodi voi siis perustua kirjaston aiempaan versioon. TypeScript-käännös paljasti virheen heti, ja Claude korjasi sen ennen raportointia. Tämän vuoksi tekoälyn tuottama koodi pitää aina kääntää ja testata (luku 4.6).

`src/main.tsx`-tiedostossa koko sovellus sijoitetaan `BrowserRouter`-komponentin sisään, jotta reititys toimii kaikissa komponenteissa. `CssBaseline` on MUI:n oma oletustyylien pohja, joka muun muassa poistaa selaimen oletusmarginaalin sivun reunoilta.

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router' // uusi
import { CssBaseline } from '@mui/material' // uusi
import AppRoutes from './AppRoutes.tsx' // muutettu

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CssBaseline /> {/* uusi */}
    <BrowserRouter> {/* uusi */}
      <AppRoutes /> {/* muutettu */}
    </BrowserRouter> {/* uusi */}
  </StrictMode>,
)
```

Uusi `src/AppRoutes.tsx` näyttää navigointipalkin jokaisen näkymän yläpuolella ja valitsee näkymän osoitteen perusteella. Jokainen `Route` liittää polun, kuten `/about`, komponenttiin. MUI:n `Stack`-komponentti tekee navigointipalkin ja sisällön väliin tyhjää tilaa `spacing`-ominaisuuden perusteella, joten omia tyylejä ei tarvita.

```tsx
import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { Container, Stack } from '@mui/material'
import NavBar from './NavBar.tsx'
import App from './App.tsx'
import About from './About.tsx'
import Form, { type Subscriber } from './Form.tsx'
import ThankYou from './ThankYou.tsx'

function AppRoutes() {
  const [subscriber, setSubscriber] = useState<Subscriber | null>(null)

  return (
    <Stack spacing={4}>
      <NavBar />
      <Container component="main">
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/about" element={<About />} />
          <Route path="/form" element={<Form onSubscribe={setSubscriber} />} />
          <Route
            path="/thank-you"
            element={
              subscriber ? (
                <ThankYou name={subscriber.name} email={subscriber.email} />
              ) : (
                <Navigate to="/form" replace />
              )
            }
          />
        </Routes>
      </Container>
    </Stack>
  )
}

export default AppRoutes
```

Lomakkeen tiedot tallennetaan `AppRoutes`-komponentin **tilaan** (state) `useState`-funktiolla. Tila on komponentin säilyttämä arvo, ja kun tila muuttuu, React piirtää komponentin uudelleen. `setSubscriber`-funktio annetaan `Form`-komponentille `onSubscribe`-nimisenä **propsina** (props). `ThankYou`-komponentti saa tilaajan nimen ja sähköpostiosoitteen propseina `name` ja `email`. Jos tilaa ei ole vielä asetettu, `Navigate`-komponentti ohjaa käyttäjän lomakkeelle, joten kiitossivua ei voi avata ilman lomakkeen tietoja. Aiheesta lisää: [useState](https://react.dev/reference/react/useState) ja [propsien välittäminen](https://react.dev/learn/passing-props-to-a-component).

`src/NavBar.tsx` rakentuu MUI:n `AppBar`- ja `Toolbar`-komponenteista. Ominaisuus `component={Link}` muuttaa MUI:n `Button`-komponentin React Routerin linkiksi, joten painike vaihtaa näkymää lataamatta sivua uudelleen. Kiitossivulle ei ole linkkiä, koska kehote rajasi sen pois navigoinnista.

```tsx
import { Link } from 'react-router'
import { AppBar, Button, Toolbar, Typography } from '@mui/material'

function NavBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div">
          Example App
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/about">
          About
        </Button>
        <Button color="inherit" component={Link} to="/form">
          Newsletter
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
```

`src/App.tsx` on nyt sovelluksen etusivu. `Typography`-komponentin `variant`-ominaisuus määrää tekstin ulkoasun, ja `component="h1"` tekee otsikosta sivun pääotsikon HTML-rakenteessa. `src/About.tsx` on rakenteeltaan samanlainen, ja siinä on otsikon lisäksi kaksi lorem ipsum -kappaletta.

```tsx
import { Typography } from '@mui/material'

function App() {
  return (
    <>
      <Typography variant="h3" component="h1" gutterBottom>
        Welcome to the Example App!
      </Typography>
      <Typography variant="body1">
        This is a simple example application built with React, React Router
        and MUI. Use the navigation bar above to read more about the app or to
        subscribe to our newsletter.
      </Typography>
    </>
  )
}

export default App
```

`src/Form.tsx` käyttää React 19:n **lomaketoimintoa** (form action). Kun lomakkeen `action`-ominaisuudeksi annetaan funktio, React kutsuu sitä lomakkeen lähetyksen yhteydessä ja antaa sille lomakkeen kentät `FormData`-oliona. Kenttien arvot luetaan kenttien `name`-ominaisuuden perusteella. Lopuksi `useNavigate`-funktiolta saatu `navigate` siirtää käyttäjän kiitossivulle. Selain tarkistaa pakolliset kentät ja sähköpostiosoitteen muodon `required`- ja `type="email"`-ominaisuuksien perusteella, joten puutteellista lomaketta ei voi lähettää.

```tsx
import { useNavigate } from 'react-router'
import { Button, Stack, TextField, Typography } from '@mui/material'

export type Subscriber = {
  name: string
  email: string
}

type FormProps = {
  onSubscribe: (subscriber: Subscriber) => void
}

function Form({ onSubscribe }: FormProps) {
  const navigate = useNavigate()

  // The data is only kept in the app's state, it is not sent anywhere.
  function subscribe(formData: FormData) {
    onSubscribe({
      name: String(formData.get('name')),
      email: String(formData.get('email')),
    })
    navigate('/thank-you')
  }

  return (
    <>
      <Typography variant="h3" component="h1" gutterBottom>
        Newsletter
      </Typography>
      <Stack component="form" action={subscribe} spacing={2}>
        <TextField name="name" label="Name" required />
        <TextField name="email" label="Email" type="email" required />
        <Button type="submit" variant="contained">
          Subscribe
        </Button>
      </Stack>
    </>
  )
}

export default Form
```

`Subscriber`-tyyppi viedään tiedostosta `export`-sanalla, jotta `AppRoutes` voi käyttää samaa tyyppiä tilassaan. `FormProps`-tyyppi kuvaa, että `Form` odottaa propsina funktion, joka ottaa vastaan `Subscriber`-olion. Aiheesta lisää: [lomakkeet Reactissa](https://react.dev/reference/react-dom/components/form).

`src/ThankYou.tsx` näyttää propseina saadut tiedot ja painikkeen takaisin etusivulle.

```tsx
import { Link } from 'react-router'
import { Button, Typography } from '@mui/material'

type ThankYouProps = {
  name: string
  email: string
}

function ThankYou({ name, email }: ThankYouProps) {
  return (
    <>
      <Typography variant="h3" component="h1" gutterBottom>
        Thank you, {name}!
      </Typography>
      <Typography variant="body1" gutterBottom>
        You have subscribed to our newsletter with the following details:
      </Typography>
      <Typography variant="body1">Name: {name}</Typography>
      <Typography variant="body1" gutterBottom>
        Email: {email}
      </Typography>
      <Button variant="contained" component={Link} to="/">
        Back to home
      </Button>
    </>
  )
}

export default ThankYou
```

### 4.4 Vaihe 3: Roboto-fontti

Edellisen vaiheen raportissa Claude huomautti, että MUI käyttää oletuksena Roboto-fonttia, jota ei asennettu kehotteen kirjastorajoituksen vuoksi. Fontti näkyi siksi vain koneilla, joille Roboto oli asennettu valmiiksi, ja muilla koneilla teksti näkyisi Helvetica- tai Arial-fontilla. Kolmas kehote on lyhyt, koska se viittaa MUI:n viralliseen ohjeeseen ja edellisen vaiheen raporttiin (Claude Coden vastaus generoinnin lopuksi, joka kuvaa tehdyt toimenpiteet).

```text
Install Roboto as per MUI instructions and add it to main.tsx
```

> [!NOTE]
> **Huomio!** Tässäkin tilanteessa agentti teki tulkinnan, jota kehittäjä ei tarkoittanut. Agentti tulkitsi vaiheen 2 kehotteen rajoituksen "Don't install any other libraries than React Router and MUI" niin tiukasti, että se jätti MUI:n virallisesta ohjeistuksesta huolimatta Roboto-fontin asentamatta. Kehitysvaiheessa käytettyyn tietokoneeseen oli asennettu järjestelmän tasolle Roboto-fontti joskus aikaisemmin, joten sovellus näytti kehittäjän koneella oikealta, eikä puuttuva fontti näkynyt Clauden ottamissa kuvakaappauksissa. Claude päätteli kuvakaappauksista, että fontti oli asennettu koneelle, ja mainitsi raporttinsa lopussa, että muilla koneilla teksti näkyisi Helvetica- tai Arial-fontilla. Jos sovellus olisi tässä tilassa koottu ja julkaistu nettiin, ei sovelluksen fontit välttämättä olisi näyttäneet samalta muilla koneilla. Tässäkin kehittäjän piti itse lukea raportti tarkasti ja korjata tulkinta erillisellä kehotteella.

Claude asensi `@fontsource/roboto`-paketin (5.3.0) ja lisäsi `src/main.tsx`-tiedostoon fontin painot 300, 400, 500 ja 700, joita MUI:n oletustypografia käyttää. Tämän jälkeen Claude rakensi projektin ja varmisti, että fonttitiedostot tulivat mukaan tuotantoversioon.

```bash
npm install @fontsource/roboto
```

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { CssBaseline } from '@mui/material'
import '@fontsource/roboto/300.css' // uusi
import '@fontsource/roboto/400.css' // uusi
import '@fontsource/roboto/500.css' // uusi
import '@fontsource/roboto/700.css' // uusi
import AppRoutes from './AppRoutes.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CssBaseline />
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </StrictMode>,
)
```

Fonttien CSS-tiedostot tuodaan `import`-lauseilla ilman nimeä, koska niistä ei käytetä mitään muuttujaa. Vite lisää tuodut tyylit ja fonttitiedostot sovellukseen. Aiheesta lisää: [MUI:n asennusohje](https://mui.com/material-ui/getting-started/installation/).

### 4.5 Vaihe 4: Tehtävälista

Neljäs kehote lisää sovellukseen uuden sivun.

```text
Add Tasks.tsx page with TextField input for new tasks, and a Button for adding a new task. Tasks are saved in localStorage. Tasks have uuid (string), name (string) and completed (boolean) values. Tasks are listed under the input and button. Task item has checkbox on the left of the name and red trash icon on the right end. Removing a task deletes it from localStorage. Add Tasks.tsx to routes and navigation. Add simple instructions above the input field, button and task list, telling user how to use the task list form.
```

Kehote kuvaa tehtävän tietorakenteen kenttien nimiä ja tyyppejä myöten, joten siitä tuli suoraan TypeScript-tyyppi `Task`. Kehote kuvaa myös käyttöliittymän asettelun, kuten valintaruudun paikan nimen vasemmalla puolella ja punaisen roskakorikuvakkeen rivin oikeassa reunassa.

Claude teki vaiheessa seuraavat toimenpiteet.

1. Roskakorikuvaketta varten Claude asensi `@mui/icons-material`-paketin (9.5.0), joka on MUI:n virallinen kuvakekirjasto. Claude mainitsi raportissaan, että paketti on uusi asennus, vaikka se kuuluu MUI:hin.
2. Tehtävien tunnisteet luodaan selaimen omalla `crypto.randomUUID()`-funktiolla, joten erillistä uuid-kirjastoa ei tarvittu.
3. Claude kirjoitti `src/Tasks.tsx`-komponentin sekä lisäsi reitin `/tasks` ja navigointipalkin painikkeen.
4. Claude testasi sivun ohjatulla Chrome-selaimella. Testi lisäsi kolme tehtävää, merkitsi yhden valmiiksi, latasi sivun uudelleen ja poisti yhden tehtävän. Jokaisen vaiheen jälkeen tarkistettiin, että `localStorage`-tallennustilan sisältö vastasi näkymää.

```bash
npm install @mui/icons-material@^9
```

```tsx
import { useEffect, useState } from 'react'
import {
  Button,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

type Task = {
  uuid: string
  name: string
  completed: boolean
}

const STORAGE_KEY = 'tasks'

function loadTasks(): Task[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as Task[]
  } catch {
    return []
  }
}

function Tasks() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks)

  // Save the tasks to localStorage every time the list changes.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  function addTask(formData: FormData) {
    const name = String(formData.get('name')).trim()
    if (!name) return

    const newTask: Task = { uuid: crypto.randomUUID(), name, completed: false }
    setTasks([...tasks, newTask])
  }

  function toggleTask(uuid: string) {
    setTasks(
      tasks.map((task) =>
        task.uuid === uuid ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  function removeTask(uuid: string) {
    setTasks(tasks.filter((task) => task.uuid !== uuid))
  }

  return (
    <>
      <Typography variant="h3" component="h1" gutterBottom>
        Tasks
      </Typography>
      <Typography variant="body1" gutterBottom>
        Type a task name and click Add to add it to the list. Tick the checkbox
        to mark a task as completed, and click the trash icon to remove it.
        Your tasks are saved in this browser, so they are still here when you
        come back.
      </Typography>

      <Stack component="form" action={addTask} direction="row" spacing={2}>
        <TextField name="name" label="New task" required fullWidth />
        <Button type="submit" variant="contained">
          Add
        </Button>
      </Stack>

      <List>
        {tasks.map((task) => (
          <ListItem
            key={task.uuid}
            disablePadding
            secondaryAction={
              <IconButton
                edge="end"
                color="error"
                aria-label={`Remove ${task.name}`}
                onClick={() => removeTask(task.uuid)}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={task.completed}
                onChange={() => toggleTask(task.uuid)}
                slotProps={{ input: { 'aria-label': task.name } }}
              />
            </ListItemIcon>
            <ListItemText primary={task.name} />
          </ListItem>
        ))}
      </List>
    </>
  )
}

export default Tasks
```

`localStorage` on selaimen tallennustila, jossa tiedot säilyvät sivun uudelleenlatauksen ja selaimen sulkemisen jälkeen. Se tallentaa vain merkkijonoja, joten tehtävälista muutetaan JSON-merkkijonoksi `JSON.stringify`-funktiolla ja takaisin taulukoksi `JSON.parse`-funktiolla. Jos tallennettu tieto on virheellistä, `try`/`catch`-rakenne palauttaa tyhjän listan. Aiheesta lisää: [localStorage (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).

`useState`-funktiolle annetaan alkuarvoksi `loadTasks`-funktio kutsumatta sitä. React kutsuu funktiota vain komponentin ensimmäisellä piirtokerralla, joten tallennustila luetaan vain kerran.

Tallennus tehdään **efektillä** (effect). `useEffect`-funktion ensimmäinen argumentti on funktio, jonka React suorittaa komponentin piirtämisen jälkeen. Toinen argumentti `[tasks]` on riippuvuuslista, joten efekti suoritetaan aina, kun `tasks`-tila muuttuu. Jokainen lisäys, valinta ja poisto tallentuu siksi heti, ja poistettu tehtävä katoaa myös tallennustilasta. Aiheesta lisää: [useEffect](https://react.dev/reference/react/useEffect).

Funktiot `addTask`, `toggleTask` ja `removeTask` antavat `setTasks`-funktiolle aina uuden taulukon. Levityssyntaksi `[...tasks, newTask]` kopioi vanhat tehtävät uuteen taulukkoon ja lisää uuden tehtävän loppuun. `map()` palauttaa uuden taulukon, jossa valittu tehtävä on korvattu kopiolla, jonka `completed`-arvo on käännetty. `filter()` palauttaa taulukon, josta poistettava tehtävä puuttuu. Tehtävälomake käyttää samaa lomaketoimintoa kuin uutiskirjelomake, ja `trim()` estää pelkistä välilyönneistä koostuvan tehtävän lisäämisen. Punainen väri tulee MUI:n `color="error"`-ominaisuudesta, joten omia tyylejä ei tarvittu.

Lopuksi `src/AppRoutes.tsx`-tiedostoon lisättiin reitti uudelle sivulle.

```tsx
import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { Container, Stack } from '@mui/material'
import NavBar from './NavBar.tsx'
import App from './App.tsx'
import About from './About.tsx'
import Form, { type Subscriber } from './Form.tsx'
import ThankYou from './ThankYou.tsx'
import Tasks from './Tasks.tsx' // uusi

function AppRoutes() {
  const [subscriber, setSubscriber] = useState<Subscriber | null>(null)

  return (
    <Stack spacing={4}>
      <NavBar />
      <Container component="main">
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/about" element={<About />} />
          <Route path="/tasks" element={<Tasks />} /> {/* uusi */}
          <Route path="/form" element={<Form onSubscribe={setSubscriber} />} />
          <Route
            path="/thank-you"
            element={
              subscriber ? (
                <ThankYou name={subscriber.name} email={subscriber.email} />
              ) : (
                <Navigate to="/form" replace />
              )
            }
          />
        </Routes>
      </Container>
    </Stack>
  )
}

export default AppRoutes
```

`src/NavBar.tsx`-tiedostoon lisättiin painike About- ja Newsletter-painikkeiden väliin.

```tsx
import { Link } from 'react-router'
import { AppBar, Button, Toolbar, Typography } from '@mui/material'

function NavBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div">
          Example App
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/about">
          About
        </Button>
        <Button color="inherit" component={Link} to="/tasks"> {/* uusi */}
          Tasks {/* uusi */}
        </Button> {/* uusi */}
        <Button color="inherit" component={Link} to="/form">
          Newsletter
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
```

### 4.6 Tekoälyn tuottaman koodin tarkistaminen

Claude ajoi jokaisen vaiheen lopussa samat tarkistukset, joita kehittäjän kannattaa käyttää myös itse. Tarkistukset tehdään seuraavassa järjestyksessä.

1. `npm run build` ajaa ensin TypeScript-kääntäjän (`tsc -b`) ja sen jälkeen Viten tuotantoversion rakentamisen. Tyyppivirhe pysäyttää komennon ennen rakentamista, kuten vaiheen 2 `paragraph`-virheessä kävi.
2. `npm run lint` ajaa oxlint-koodintarkastimen `.oxlintrc.json`-tiedoston säännöillä. Koodintarkastin etsii koodista virheitä ja huonoja käytäntöjä, kuten Reactin hookien virheellistä käyttöä.
3. `npm run dev` käynnistää kehityspalvelimen, jonka jälkeen jokainen näkymä, linkki ja lomake kokeillaan selaimessa.
4. Tekoälyn raportti luetaan kokonaan. Raporteissaan Claude kertoi poikkeamat kehotteesta, kuten Emotion- ja kuvakepakettien asennukset, sekä toteutuksen seuraukset. Yksi tällainen seuraus on, että kiitossivun tiedot katoavat sivun uudelleenlatauksessa, koska ne ovat vain `AppRoutes`-komponentin tilassa.

Keskustelun kehotteista näkyy, millainen kehote tuottaa käyttökelpoista koodia. Tiedostojen nimet, tietorakenteet ja versiot kerrottiin kehotteissa suoraan, joten tekoälyn ei tarvinnut arvata niitä. Pyyntö käyttää uusinta Viteä toimi, koska Claude tarkisti versiot npm-rekisteristä ennen asennusta. Rajoitukset, kuten "Don't install any other libraries than React Router and MUI" ehkäisevät tarpeettomien pakettien asentamisen. Kun rajoitusta ei voitu noudattaa täysin, Claude kertoi poikkeamasta, ja kehittäjä pystyi päättämään jatkosta. Tarkoista kehotteista huolimatta agentti teki tulkintoja, joita kehittäjä ei tarkoittanut. Esimerkiksi Roboto-fontti jäi asentamatta, koska agentti tulkitsi kirjastorajoituksen tiukasti, eikä puute näkynyt kehittäjän koneella, jolle fontti oli asennettu valmiiksi (luku 4.4).

### 4.7 Agentin ohjaaminen kehotteiden ulkopuolella

Tässä demossa agenttia ohjattiin pelkillä keskustelun kehotteilla, jotta työnkulku voitiin esittää vaihe vaiheelta. Tapa ei ole paras mahdollinen, koska keskustelussa annetut ohjeet ovat voimassa vain kyseisessä keskustelussa. Uusi istunto ei sisällä aiempien keskustelujen ohjeita, ja pitkän keskustelun **tiivistämisessä** (compaction) pelkästään keskustelussa annetut ohjeet voivat kadota. Rajoitus, kuten "Don't install any other libraries than React Router and MUI", pitäisi siksi toistaa jokaisessa kehotteessa. Vaiheen 4 kehotteessa rajoitusta ei toistettu, ja agentti asensi uuden `@mui/icons-material`-paketin. Paketti oli tarpeellinen ja agentti kertoi asennuksesta raportissaan, mutta rajoitus oli kirjattu vain aiempaan kehotteeseen.

`CLAUDE.md` on projektin juureen sijoitettava ohjetiedosto, jonka Claude Code lukee jokaisen istunnon alussa. Siihen kirjoitetaan asiat, joita agentti ei saa selville projektin koodista, kuten tarkistuskomennot, rajoitukset, tehdyt päätökset ja kohdat, joissa koodin rakenne voi johtaa harhaan. Tiedosto tallennetaan versionhallintaan, joten samat ohjeet ovat voimassa jokaisessa istunnossa ja jokaisella projektin kehittäjällä. Anthropicin ohjeen mukaan tiedosto kannattaa pitää alle 200 rivin mittaisena, koska pitkä tiedosto kuluttaa agentin **kontekstia** (context) ja heikentää ohjeiden noudattamista. Ohjeet kirjoitetaan otsikoiden alle lyhyinä kohtina, joiden toteutuminen voidaan tarkistaa. Esimerkiksi ohjeen "`npm run build` and `npm run lint` must both pass" toteutumisen voi tarkistaa, mutta yleisen ohjeen "tarkista muutokset" toteutumista ei voi. Ohjeet ovat agentille annettua tekstiä, joten niiden noudattamista ei ole taattu. Komento `/init` luo projektista `CLAUDE.md`-tiedoston pohjaversion automaattisesti. Aiheesta lisää: [Claude Coden muisti ja CLAUDE.md](https://code.claude.com/docs/en/memory).

Demon valmistuttua tämän projektin `CLAUDE.md` täytettiin seuraavalla kehotteella.

```text
Based on best practises and guidelines, fill up the CLAUDE.md based on the project source and configuration. Explain each section, what it does and why it's there.
```

Tiedostoon kirjattiin muun muassa keskustelun aikana annetut rajoitukset, GitHub Pages -julkaisun vaatimukset ja demossa havaitut versiokohtaiset sudenkuopat, kuten MUI 9:stä poistettu `paragraph`-ominaisuus. Alla on tiedostosta kaksi osiota, ja koko tiedosto löytyy projektin juuresta.

```markdown
## Constraints

- Dependencies: only React, React Router and the MUI family (`@mui/material`, `@mui/icons-material`, `@emotion/react`, `@emotion/styled`, `@fontsource/roboto`). Ask before installing anything else. Prefer browser APIs such as `crypto.randomUUID()` over new packages.
- Styling: no CSS files, `sx` props, `styled()` or theme overrides. Use MUI defaults and component props only (`spacing`, `gutterBottom`, `variant`, `color`).
- No network requests. Form data stays in React state, and persistence is `localStorage` only.
- Don't create a git repository, commit, push or deploy unless asked. The user publishes by uploading the contents of `dist/`.

## GitHub Pages requirements

The build is served from `https://<user>.github.io/<repo>/`, a subfolder with no single-page-app fallback.

- Keep `HashRouter` in `src/main.tsx`. `BrowserRouter` breaks reloads and direct links on GitHub Pages.
- Keep `base: './'` in `vite.config.ts`. Don't use root-absolute URLs (`/something`) for assets.
- Route paths stay plain (`to="/about"`). `HashRouter` adds the `#`.
```

`Constraints`-osio korvaa kiellot, jotka tässä demossa kirjoitettiin kehotteisiin. `GitHub Pages requirements` -osio estää agenttia vaihtamasta reititystä takaisin `BrowserRouter`-komponenttiin, mikä rikkoisi julkaistun sovelluksen. Jokaisessa kohdassa kerrotaan myös syy, jotta agentti voi soveltaa sääntöä tilanteisiin, joita ohjeessa ei mainita suoraan.

`CLAUDE.md` ei ole ainoa tapa ohjata agenttia kehotteen ulkopuolella. `CLAUDE.local.md`-tiedostoon kirjoitetaan omat projektikohtaiset ohjeet, joita ei haluta versionhallintaan. `.claude/rules/`-kansion sääntötiedostot voidaan rajata koskemaan vain tiettyjä tiedostoja, kuten `src`-kansion komponentteja. **Taidot** (skills) ovat `.claude/skills/<nimi>/SKILL.md`-tiedostoihin kirjoitettuja ohjeita monivaiheisille työnkuluille, ja agentti ottaa taidon käyttöön, kun tehtävä vastaa taidon kuvausta. Tämä README kirjoitettiin taidon avulla, joka määrää dokumentin rakenteen, kielen ja tarkistusvaiheet. Aiheesta lisää: [Claude Coden taidot](https://code.claude.com/docs/en/skills).

**Suunnittelutilassa** (plan mode) agentti tutkii projektin ja ehdottaa muutossuunnitelmaa muokkaamatta tiedostoja. Tila otetaan käyttöön `Shift+Tab`-näppäinyhdistelmällä tai aloittamalla kehote komennolla `/plan`. Osan 2 ensimmäinen kehote olisi hyötynyt suunnittelutilasta, koska `BrowserRouter`-ratkaisu olisi näkynyt suunnitelmassa ennen tiedostojen muuttamista. Aiheesta lisää: [suunnittelutila](https://code.claude.com/docs/en/permission-modes).

Kaikki edellä mainitut keinot ovat agentille annettua tekstiä. **Käyttöoikeussäännöt** (permission rules) ja **koukut** (hooks) toimivat eri tavalla, koska Claude Code valvoo niitä itse kielimallista riippumatta. Esimerkiksi `.claude/settings.json`-tiedoston `permissions`-osioon kirjoitettu kieltosääntö `Bash(git push *)` estää `git push` -alkuiset komennot, joten kieltoa "Don't attempt to push anything" ei tarvitse kirjoittaa kehotteeseen. Sääntö tunnistaa kuitenkin vain komennot, jotka alkavat sanoilla `git push`. Koukut ovat komentoja, jotka Claude Code ajaa automaattisesti tietyissä vaiheissa, esimerkiksi jokaisen tiedostomuokkauksen jälkeen. Koukku voi esimerkiksi ajaa `npm run lint` -komennon jokaisen muutoksen jälkeen, jolloin tarkistus tapahtuu joka kerta riippumatta siitä, mitä agentille on kerrottu. Aiheesta lisää: [käyttöoikeudet](https://code.claude.com/docs/en/permissions) ja [koukut](https://code.claude.com/docs/en/hooks-guide).

Pysyvät ohjeet kannattaa siis kirjoittaa `CLAUDE.md`-tiedostoon, toistuvat työnkulut taidoiksi ja ehdottomat kiellot käyttöoikeussäännöiksi tai koukuiksi. Kehotteeseen jää tällöin vain kyseisen tehtävän kuvaus, ja agentti toimii samoilla säännöillä jokaisessa istunnossa.

---

## 5. Osa 2: Tuotantoversio GitHub Pagesia varten

GitHub Pages julkaisee repositorion tiedostot staattisena sivustona. Projektisivuston osoite on muotoa `https://<käyttäjä>.github.io/<repositorio>/`, joten sovellus sijaitsee palvelimella alikansiossa. Palvelin palauttaa vain olemassa olevia tiedostoja, ja olemattomasta osoitteesta se näyttää 404-virhesivun. Molemmat asiat vaativat muutoksia projektiin ennen tuotantoversion rakentamista.

Muutokset tehtiin samassa Claude Code -keskustelussa kolmella kehotteella.

```text
Configure the project for build to GitHub pages. Then build the app. Don't init GitHub repo or attempt to push anything.
```

```text
Switch routing to HashRouter for GitHub pages.
```

```text
Make the vite.config.ts change to base
```

Ensimmäinen kehote rajasi tekoälyn toimintaa, koska se kielsi GitHub-repositorion luomisen ja koodin lähettämisen GitHubiin. Kehotteen tuottamassa ratkaisussa reititys säilyi `BrowserRouter`-komponentilla. Toinen kehote vaihtoi reitityksen `HashRouter`-komponenttiin. Kolmas kehote hyväksyi `base`-muutoksen, jota Claude oli ehdottanut edellisessä raportissaan, ja siksi kehote on näin lyhyt. Lopputulokseen tarvitaan kaksi muutosta, jotka kuvataan luvuissa 5.1 ja 5.2.

Ensimmäinen kehote oli puutteellinen, koska se ei kertonut, miten reitityksen piti toimia GitHub Pagesissa, eikä sitä, että repositorion nimeä ei vielä tiedetty. Claude teki puuttuvista tiedoista omat oletuksensa. Se säilytti `BrowserRouter`-komponentin ja sitoi Viten `base`-polun projektikansion nimeen `/react_demo/`, jotta reititys toimisi GitHub Pagesin alikansiossa. Tällainen `BrowserRouter`-ratkaisu ei ole suositeltu käytäntö GitHub Pages -julkaisussa, koska palvelin ei ohjaa sovelluksen reittejä `index.html`-tiedostoon ja ratkaisu tarvitsee toimiakseen kiertotien. Kehittäjä huomasi ratkaisun Clauden raportista ja korjasi reitityksen jälkikäteen haluamaansa muotoon kahdella lisäkehotteella. Jos ensimmäisessä kehotteessa olisi pyydetty `HashRouter`-reititystä ja suhteellista `base`-polkua, korjauksia ei olisi tarvittu.

### 5.1 Suhteelliset polut Viten asetuksissa

Vite viittaa rakennetussa `index.html`-tiedostossa JavaScript- ja CSS-tiedostoihin oletuksena polulla, joka alkaa kauttaviivalla, kuten `/assets/index-DBBNdDIx.js`. GitHub Pagesissa tällainen polku osoittaa `github.io`-palvelimen juureen eikä repositorion alikansioon, joten selain ei löydä tiedostoja ja sivu jää tyhjäksi. `base`-asetus määrää rakennettujen tiedostojen **peruspolun** (base path). Arvolla `'./'` polut muuttuvat suhteellisiksi, kuten `./assets/index-DBBNdDIx.js`, ja ne toimivat missä tahansa alikansiossa.

```ts
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Relative asset paths let the build work from any GitHub Pages repository // uusi
  // name. Routing uses HashRouter, so the page itself is always index.html. // uusi
  base: './', // uusi
  server: {
    port: 3000,
    strictPort: true,
  },
})
```

Suhteellinen peruspolku tekee tuotantoversiosta riippumattoman repositorion nimestä. Viten dokumentaatio esittää vaihtoehdoksi arvoa `'/<repositorio>/'`, mutta silloin asetus pitää päivittää aina, kun repositorion nimi vaihtuu. Suhteellinen polku toimii tässä sovelluksessa, koska `HashRouter`-reitityksessä (luku 5.2) selain lataa aina saman `index.html`-tiedoston. Aiheesta lisää: [Viten base-asetus](https://vite.dev/config/shared-options#base).

### 5.2 HashRouter reitityksen pohjaksi

`BrowserRouter` käyttää selaimen tavallisia osoitteita, kuten `/react_demo/about`. Kun tällainen osoite avataan suoraan tai sivu ladataan uudelleen, selain pyytää palvelimelta `about`-nimistä tiedostoa, jota ei ole olemassa. `HashRouter` sijoittaa reitin osoitteessa `#`-merkin jälkeen, kuten `/react_demo/#/about`. Selain ei lähetä `#`-merkin jälkeistä osaa palvelimelle, joten palvelin palauttaa aina `index.html`-tiedoston, ja React Router lukee reitin osoitteen `#`-osasta.

`src/main.tsx`-tiedostossa vaihdetaan vain reititinkomponentti.

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router' // muutettu
import { CssBaseline } from '@mui/material'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import AppRoutes from './AppRoutes.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CssBaseline />
    <HashRouter> {/* muutettu */}
      <AppRoutes />
    </HashRouter> {/* muutettu */}
  </StrictMode>,
)
```

Muihin komponentteihin ei tarvita muutoksia, koska linkkien polut, kuten `to="/about"`, pysyvät samoina. `HashRouter` lisää `#`-merkin linkkien osoitteisiin, joten navigointipalkin About-linkki osoittaa osoitteeseen `#/about`. Kehityspalvelimella sovelluksen osoitteet ovat nyt muotoa `http://localhost:3000/#/about`. Aiheesta lisää: [HashRouter](https://reactrouter.com/api/declarative-routers/HashRouter).

> [!NOTE]
> Ensimmäisen kehotteen ratkaisussa Claude toteutti reitityksen eri tavalla kuin kehittäjä oli tarkoittanut. Reititys säilyi `BrowserRouter`-komponentilla, joka sai `basename`-ominaisuudeksi Viten peruspolun. Viten `base`-asetus oli `'/react_demo/'` vain tuotantoversiossa ja esikatselussa, kun taas kehityspalvelin käytti juuripolkua `/`. Lisäksi `package.json`-tiedostoon lisättiin `postbuild`-komento, joka kopioi rakentamisen jälkeen `index.html`-tiedoston nimelle `404.html`. GitHub Pages näyttää `404.html`-tiedoston, kun pyydettyä sivua ei ole, joten sovellus latautui myös suorista osoitteista, kuten `/react_demo/about`. Korjatussa ratkaisussa reititys tehdään `HashRouter`-komponentilla ilman `basename`-ominaisuutta, ja `base`-asetus on `'./'` kaikissa tilanteissa. `postbuild`-komentoa ei enää tarvita, ja osoitteet ovat muotoa `/react_demo/#/about`.
>
> Ensimmäisen ratkaisun etuna olivat siistimmät osoitteet ilman `#`-merkkiä. Sillä oli kuitenkin useita mahdollisia sivuvaikutuksia. Tuotantoversio toimi vain `react_demo`-nimisessä repositoriossa, joten repositorion nimen vaihtaminen olisi vaatinut asetuksen muuttamista ja uuden käännöksen. Suorat osoitteet ja sivun uudelleenlataukset toimivat virhesivun kautta, joten palvelimen vastaus saattoi olla virhekoodi, ja esimerkiksi hakukoneet voivat tulkita tällaiset sivut puuttuviksi. Kehityspalvelin ja tuotantoversio käyttivät eri peruspolkuja, mikä teki asetuksista monimutkaisemmat. Tämä näkyi jo testauksessa, koska esikatselu näytti aluksi tyhjiä sivuja, kunnes `base`-asetus otettiin käyttöön myös esikatselussa.

### 5.3 Tuotantoversion rakentaminen

Tuotantoversio rakennetaan seuraavalla komennolla.

```bash
npm run build
```

Komento ajaa `package.json`-tiedostossa määritellyn komennon `tsc -b && vite build`. TypeScript-kääntäjä tarkistaa ensin tyypit, ja jos virheitä ei löydy, Vite kokoaa sovelluksen `dist`-kansioon. Tuloksena `dist`-kansiossa on `index.html`-tiedosto ja `assets`-kansio. `assets`-kansiossa on yksi JavaScript-tiedosto, yksi CSS-tiedosto ja 64 Roboto-fonttitiedostoa. Fonttitiedostoja on näin monta, koska `@fontsource/roboto` sisältää jokaiselle neljälle painolle erilliset tiedostot kahdeksalle merkistölle, kuten latinalaiselle, kyrilliselle ja kreikkalaiselle, kahdessa tiedostomuodossa (`.woff` ja `.woff2`).

Rakennettu `dist/index.html` näyttää seuraavalta.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React Demo</title>
    <script type="module" crossorigin src="./assets/index-DBBNdDIx.js"></script>
    <link rel="stylesheet" crossorigin href="./assets/index-Gk2HJJmQ.css">
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

Polut alkavat merkeillä `./`, koska `base`-asetus on `'./'`. Tiedostonimien loppuosa, kuten `DBBNdDIx`, on tiedoston sisällöstä laskettu **tiiviste** (hash). Tiiviste muuttuu, kun tiedoston sisältö muuttuu, joten omassa käännöksessä nimet voivat poiketa tässä näytetyistä.

`dist`-kansio on lueteltu projektin `.gitignore`-tiedostossa, joten Git ei tallenna sitä repositorioon. Tuotantoversio ladataan siksi GitHubiin erikseen (luku 7).

### 5.4 Tuotantoversion testaaminen

Tuotantoversiota kokeillaan omalla koneella ennen julkaisua.

```bash
npm run preview
```

Komento käynnistää paikallisen palvelimen, joka tarjoaa `dist`-kansion tiedostot osoitteessa http://localhost:4173/. Palvelin on tarkoitettu vain tuotantoversion kokeilemiseen, eikä sitä käytetä varsinaiseen julkaisuun. Selaimessa kokeillaan jokainen näkymä, ja osoitteet, kuten http://localhost:4173/#/tasks, avataan myös suoraan osoiteriviltä. Claude testasi tuotantoversion lisäksi kopioimalla `dist`-kansion sisällön alikansioon `some-repo` ja avaamalla sen tavallisen staattisen palvelimen kautta. Näin varmistettiin, että sovellus toimii myös toisen nimisessä repositoriossa.

> [!NOTE]
> Selain säilyttää `localStorage`-tiedot sivustokohtaisesti, ja eri portti tarkoittaa eri sivustoa. Kehityspalvelimella (portti 3000) lisätyt tehtävät eivät siksi näy esikatselussa (portti 4173) eivätkä GitHub Pagesissa julkaistussa sovelluksessa.

## 6. Projektin rakenne lopussa

Kansiot `node_modules` ja `dist` syntyvät komennoista `npm install` ja `npm run build`, eikä niitä tallenneta Git-repositorioon. `dist`-kansion fonttitiedostot on tiivistetty alla yhdelle riville.

```text
react_demo/
├── dist/
│   ├── assets/
│   │   ├── index-DBBNdDIx.js
│   │   ├── index-Gk2HJJmQ.css
│   │   └── roboto-*.woff ja roboto-*.woff2 (64 fonttitiedostoa)
│   └── index.html
├── node_modules/
├── src/
│   ├── About.tsx
│   ├── App.tsx
│   ├── AppRoutes.tsx
│   ├── Form.tsx
│   ├── main.tsx
│   ├── NavBar.tsx
│   ├── Tasks.tsx
│   └── ThankYou.tsx
├── .gitignore
├── .nvmrc
├── .oxlintrc.json
├── CLAUDE.md
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## 7. Julkaisu GitHub Pagesissa

Tuotantoversio julkaistaan omassa repositoriossaan, johon ladataan pelkkä `dist`-kansion sisältö. GitHub Free -tilillä GitHub Pages toimii vain julkisissa repositorioissa.

1. GitHubiin luodaan uusi julkinen repositorio, esimerkiksi nimellä `react_demo`. Nimi voi olla mikä tahansa, koska tuotantoversio käyttää suhteellisia polkuja (luku 5.1).
2. Repositorion tiedostolistan yläpuolelta valitaan ”Add file” → ”Upload files”. Sivulle vedetään `dist`-kansion sisältö eli `index.html`-tiedosto ja `assets`-kansio, ja lataus vahvistetaan sivun alareunan painikkeella. Kansion sisältö ladataan ilman `dist`-kansiota, koska GitHub Pages etsii `index.html`-tiedostoa julkaisukansion ylimmältä tasolta.
3. Repositorion asetuksista avataan ”Settings” → ”Pages”. Kohdassa ”Build and deployment” valitaan lähteeksi (”Source”) ”Deploy from a branch”, haaraksi `main` ja kansioksi `/ (root)`, ja valinta tallennetaan painikkeella ”Save”.
4. Julkaisu voi kestää enintään kymmenen minuuttia. Sovellus löytyy osoitteesta `https://<käyttäjä>.github.io/<repositorio>/`, ja ”Pages”-asetussivun ”Visit site” -linkki avaa sen suoraan.

Kun sovellusta muutetaan, tuotantoversio rakennetaan uudelleen komennolla `npm run build`, ja `dist`-kansion uusi sisältö ladataan repositorioon vanhan tilalle.

> [!NOTE]
> Jos tuotantoversio halutaan julkaista samasta repositoriosta kuin lähdekoodi, `dist`-kansiota ei voi ladata Gitillä `.gitignore`-tiedoston vuoksi. Silloin julkaisu tehdään GitHub Actions -työnkululla, joka rakentaa tuotantoversion GitHubin palvelimella. Valmis työnkulku löytyy [Viten julkaisuohjeesta](https://vite.dev/guide/static-deploy).

Aiheesta lisää: [GitHub Pages -sivuston luominen](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site).

## 8. Yhteenveto

Tässä demossa käytiin läpi React-sovelluksen ohjelmointi tekoälyavustajan kanssa vaihe kerrallaan niin, että jokainen kehote kuvaa lopputuloksen, tiedostot ja rajoitukset tarkasti ja jokainen vaihe tarkistetaan käännöksellä, koodintarkastimella ja selaimessa. Samalla nähtiin, miten tarkoista kehotteista huolimatta tekoäly voi tehdä vääriä oletuksia tai valintoja, joita ei haluttu, jonka takia tekoälyn tuottamat koodit ja vastaukset on aina varmistettava itse. Lisäksi käytiin läpi Vite-projektin koonti staattista julkaisua varten suhteellisilla poluilla ja `HashRouter`-reitityksellä sekä rakentamaan ja julkaisemaan tuotantoversio GitHub Pagesissa.

