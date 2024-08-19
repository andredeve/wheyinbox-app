import {useState, createContext, useEffect} from 'react';
import {auth, db} from '../services/firebaseConection';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, collection, getDocs, updateDoc} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const AuthContext = createContext({});

function AuthProvider({children}){
    const [user, setUser] = useState(null);
    const [loadingauth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const nomesCandidatos = [
      "EDSON AUGUSTO ALVES DA SILVA",
      "FERNANDO AGUES DE OLIVEIRA",
      "GLEICIANE SANTOS COSTA",
      "PEDRO ELIAS DA SILVEIRA",
      "HENRIQUE LIMA DOS SANTOS",
      "LUCAS MATHEUS BARBOSA DEOLIVEIRA",
      "JOÃO VICTOR FRANCISQUETT DOS SANTOS",
      "MAURI KEHL JUNIOR",
      "VINICIUS MORETTI DE PAULA",
      "REUHEL DA SILVA CAVALCANTE",
      "WILLIAM MARCARI RIBEIRO BARROS",
      "JULIO CESAR SILVA RODRIGUES",
      "LARISSA ARYANE GALVÃO",
      "THAYLOANE SOUZA DA SILVA LUZ",
      "LUCIENE SALES DOS SANTOS",
      "PAULO SÉRGIO AKIEDA",
      "FERNANDA CARDOSO WOLF",
      "RENATO ARTHUR FABRO DOS SANTOS",
      "BRUNA QUEZINI DA SILVA",
      "ALEXSANDRA CAROLINA GUIMARÃES DE OLIVEIRA",
      "MEIRI ANITA NICHETTI HAACH",
      "ANDRÉ LUIZ FERREIRA DA SILVA",
      "RONALDO LOPES MACIEL",
      "JULIANA ROMEIRO SALINA",
      "WILLIAN DIAS DA SILVA JUNIOR",
      "THIAGO ALBERTO VALLE DO NASCIMENTO",
      "MURILO BRENDO DIAS LINS",
      "EDMILSON CAMARGO DA SILVA",
      "MARIANA MARIA RODRIGUES ZITO",
      "GUSTAVO CESAR DOMINGUES DE OLIVEIRA",
      "ANDRÉ DE LIMA BENTEO",
      "GABRIELA RIBEIRO MENDONÇA MALDONADO",
      "LYNCON MARQUES",
      "RODRIGO ALVES BARROS",
      "VITORIA CAROLINE BARBOZA FERNANDES DE SOUZA",
      "ELLIOT JACQUES LIMA",
      "PEDRO HENRIQUE FIGUEIREDO BARBOSA",
      "EDSON EDUARDO FERNANDES AMARILHA",
      "WESLEY MENDONÇA DE BRITO SILVA",
      "CARLOS HENRIQUE ALVES RODRIGUES",
      "JOSÉ GOMES DE ANDRADE NETO",
      "OSMAR VASQUES GONZALEZ",
      "CASSIANO LUCAS SIMPLICIO BATISTOTE",
      "LARISSA ARGUILERA DE PAULA (SUB JUDICE)",
      "LUDIÉR MARIANO ROSA",
      "BRUNO MACIEL GARCIA",
      "VIVIANE CASSEMIRO DE ALMEIDA CANEPA",
      "VÍTOR DA ROCHA DIAS DUARTE",
      "CAMILA DA SILVA CALIXTO AGUIRRE",
      "PEDRO GABRIEL TELES BARBOSA",
      "WESLEY ALVES COSTA",
      "CLAUDIELI TANARA WOTTRICH TIMM",
      "IGOR DE OLIVEIRA SALINA (SUB JUDICE)",
      "LUCAS FIGALE CARDOSO",
      "ARTHUR ARAUJO DO NASCIMENTO",
      "MONIQUE ORTIZ SANTANA",
      "LUIS FERNANDO PEREIRA PINTO",
      "ALINE GOMES GONÇALVES",
      "MELANY ESTEVAO BARBOSA SOARES (SUB JUDICE)",
      "LUCAS DE OLIVEIRA DINIZ",
      "CLOVIS DE SOUZA ROCHA",
      "GIOVANNY SOUZA DA FONSECA",
      "RICARDO JUNIOR ALVES KUROVSKI",
      "ALEXANDRE BERNARDES GOMES DA SILVA",
      "LEANDRO DOS SANTOS PEREIRA",
      "DENNER DOUGLAS MEDEIROS SOARES",
      "EDSON MAXIMO ROMERO JUNIOR",
      "LUIZ FERNANDO NUNES",
      "VALLERIA ORSO VALMINI SIQUEIRA",
      "THAISSON OLIVEIRA DA SILVA",
      "JOHNNE ALEX BATISTA GOMES",
      "NÍCOLAS NOGUEIRA DUAILIBI",
      "NICOLE RODA RODRIGUES",
      "DOUGLAS SOARES REGINI",
      "LUCAS ANTHONY ALVES BARROS",
      "FERNANDA SILVA MARQUES",
      "ELIVANDER SANCHES HONORATO",
      "REWLLER VIANNA DA SILVA",
      "BRUNO VINICIUS DA SILVA ABREU",
      "ANDERSON BARROSO DE ALMEIDA",
      "SAMUEL DE SOUZA QUEIROZ",
      "DANIELLA FERREIRA LEITE",
      "RAISSA MARIA ALVES VIDA",
      "BRUNO ANTONIO DOS REIS",
      "DALVAN BRUNO FERREIRA DA SILVA",
      "MARIA EDUARDA AVELINO PRATES",
      "GRACIELY FERREIRA RODRIGUES",
      "CRISTINA SCHULTZ KUHN",
      "LORENA PEREIRA DE SOUZA",
      "EMERSON RODRIGO PEREIRA DOS SANTOS",
      "IZABELLE SOUZA DELATERRA DE ASSIS",
      "YGOR GARCIA DE OLIVEIRA",
      "ALBERT NATAN DE OLIVEIRA MEDEIROS",
      "WESLEY VINICIUS BORDAS DE FIGUEIREDO",
      "CLEYTON CASSIANO RIBEIRO RODRIGUES",
      "MATHEUS HEMERSON NOGUEIRA RODRIGUES",
      "FERNANDA CAROLINE BATISTOTI SIMAS",
      "EBER DE MORAIS MARINHAS",
      "LARISSA FERNANDES DE SOUZA",
      "LUCAS VINÍCIUS CONCHE DE SOUZA",
      "KAROLYNE FREITAS NASCIMENTO",
      "MARIA ESTELA DA SILVA CASANOVA (SUB JUDICE)",
      "GABRIELE BEZERRA PORTO",
      "BRENDA RODRIGUES RAMIRES FERREIRA",
      "ISABELLA CATARINA RODRIGUES JACOB",
      "ALINE SZAUBRAM",
      "LUIZ FELIPE MINUSSI DA SILVA",
      "ADILSON ANTUNES MARTINS",
      "BRENDO DE JESUS DA SILVA",
      "LUCIANA TINOCO MACHADO",
      "SERGIO WILLIMANN DE SOUZA",
      "MICHELE PETRONILO INZABRAL",
      "MARCELOS SIMÃO BASÍLIO SOBRINHO",
      "LAUANA ELISA RAMALHO DE SOUZA",
      "CAIO BOAVENTURA DA SILVA",
      "JOÃO VICTOR GUEDES DE LIMA",
      "HERICK MATHEUS DE SOUZA EXTECA",
      "CARLA CAROLINE PINTO DE ARRUDA",
      "DANIEL DE JESUS ARAÚJO",
      "FERNANDA CASTELO GIRARD",
      "LUCAS NOGUEIRA TOTE",
      "STEPHANNY KAROLINE BORGES SONCHINI",
      "DEBORA BRITES RIBEIRO DE BRITES",
      "FAGNER CHARLES RAMOS",
      "SIÉSLEM MENEZES SANCHE PÉREZ",
      "BRENO REZENDE RODRIGUES",
      "JOÃO MATHEUS NAVARRO DOS SANTOS",
      "RAQUEL DUARTE FELIPETTO",
      "ÉVERTON SCHIRMANN ROSATI",
      "WENYBERG DE MELLO NUNES",
      "ALANA JAQUELINE BELLINI OLIVEIRA",
      "RODRIGO DO CARMO SOUZA",
      "IGOR FIGUEIRÓ DO AMARAL",
      "EMILAINE ZORZI LEANDRO",
      "THALISON MOREIRA GOUVEIA",
      "VINICIUS BRANDAO BORGES",
      "RENAN NOGUEIRA NAVARRO",
      "KEVIN MACALISRER NOGUEIRA BARCELLOS",
      "AFONSO CABREIRA LEAO",
      "WALDEMAR SANTANA OLIVEIRA",
      "NAIJARA DA SILVA DIAS",
      "RICARDO PEREIRA DA CRUZ JUNIOR",
      "ABNER DINIZ SAMPAIO DOS SANTOS",
      "LUCAS BATISTA SILVA",
      "GABRIEL LOPES ALMEIDA",
      "JOAO GABRIEL DA SILVA DANTAS",
      "JOAO PAULO PEREIRA MONTESSI",
      "LUIZ EDUARDO DA PAZ VITOR",
      "KAMAYKEL SANTOS DE OLIVEIRA",
      "JAIME GOMES DE SOUZA",
      "ADRIANO HILARIO TALARICO SOLETTI",
      "WILLIAM GEOVANI PINESSO",
      "MARAISA MENDES",
      "LUIZ HENRIQUE MARTINS MEDEIROS",
      "PATRICIA DE KASSIA VASCONCELOS",
      "ANA CAROLINA VITURIANO SOUZA",
      "LUCAS RIBEIRO PIRES",
      "LUCAS DA SILVA MACHADO",
      "DIOGENES MAURICIO MACHADO",
      "MARCUS VINICIUS NEVES CAETANO",
      "RODRIGO DUARTE BONO BELASCUSA",
      "EURICO RENAN MARTINS DOS SANTOS",
      "ELISEO BRITES DE MORAES NETO",
      "RENATA CAMILA DA COSTA SILVA",
      "GABRIELLY APARECIDA MARQUES RIBEIRO",
      "LAÍS MICHELS FONSECA",
      "EDER BENITES PETZOLD",
      "BRUNO HENRIQUE SIMÕES",
      "EBERLE TAYSSON PEREIRA MACIEL",
      "ARTHUR VICTOR LEON CAIUBI SOUZA SILVA",
      "VANESSA MENDES DA SILVA DE OLIVEIRA (SUB JUDICE)",
      "MOACIR FELIPE ARAUJO LESCANO",
      "GIOVANA VIÊRO PECCINI",
      "BIANCA CASSUPA PEREIRA",
      "JULIANY BRITO DE ARAUJO",
      "JEAN CARLOS VILELA DE MELO",
      "CARLA PRISCILA FERREIRA MIRANDA",
      "LUCAS SOUZA GIMENES",
      "DANIELLE AGUENA MARTOS COSTA",
      "THIAGO GERMANO DE FIGUEIREDO",
      "ISAIAS SIMOEL GIMENEZ MIOTTI",
      "FERNANDO BORGES ZWICKER",
      "JAMIELLE FERNANDA DUARTE DE AMORIM",
      "VITOR HUGO DA SILVA SANTOS",
      "NEEMIAS DE SOUZA JEREMIAS",
      "RICK KENDY IWASHIRO",
      "ALISSON MONTEIRO CALAZANS",
      "FERNANDA ISFRAN DA SILVA",
      "MATTHEUS CARDENAS SOUZA",
      "MICHAEL FRANCISCO DA SILVA (SUB JUDICE)",
      "GIOVANI TEIXEIRA DA SILVA (SUB JUDICE)",
      "GUSTAVO RODRIGUES LEMES",
      "NATHALIA WELIKA DOS SANTOS ARAUJO",
      "MAGNO LEONCIO SANCHES SARAIVA",
      "LUÍS FLÁVIO ISAÍAS LOPES",
      "LUCAS MATOS DO NASCIMENTO",
      "JANAÍNA DA SILVA CARVALHO SANTOS",
      "MAURICIO MATHEUS DE FRANÇA ARAUJO",
      "JUNIOR CESAR RODRIGUES COLOMBO",
      "ISAQUE MELESCHCO ARGUELHO",
      "MAÍRA DE BRITO RODRIGUES ALVES",
      "RAFAEL VASQUES RIBEIRO",
      "THALIA DA SILVA BEZERRA",
      "THOR BRUM DE OLIVEIRA",
      "GUSTAVO RIBEIRO DOS SANTOS",
      "FELIPE DAVID DE OLIVEIRA",
      "MARCOS DA SILVA REZENDE",
      "STEFAN WOLFF",
      "GABRIELLE ANGEL LEIKO REZENDE NAKASHIMA",
      "CÉSAR FRANCISCO QUIRINO",
      "RENAN MATHEUS OLIVEIRA DO NASCIMENTO",
      "BRUNO NOÉ EGER SAMPAIO",
      "RAQUEL APARECIDA LIMA SILVA",
      "RAFAEL HENRIQUE NOGUEIRA RONCADA",
      "FRANCISCO RONDON NETO",
      "HENRIQUE BARBOSA COELHO",
      "LUCAS FARIAS ALVES",
      "TAINA DA SILVA",
      "JOSÉ DAVI DA SILVA DE OLIVEIRA",
      "ELAINE MARIA RAMOS DOS SANTOS",
      "RAFAEL LEMOS",
      "ANA JULIA MUNIZ LEMES",
      "LAÉRCIO ANTONIO DE SENA JÚNIOR",
      "NIKOLAS REZENDE OBREGÃO NOGUEIRA",
      "WESLEY PEREIRA DOS SANTOS",
      "MOISES SOUSA SANTIAGO",
      "FÁBIO CABRAL DE MORAES",
      "TIAGO TADEU MENDES NEPOMUCENO SALLES",
      "HERCULES MIRANDA DA SILVA",
      "ROGERIO MENDES DA SILVA",
      "ARTHUR NATAN SANTOS SILVA",
      "MATHEUS DA CRUZ ALVES",
      "LUANA CRISTINA AVELINO",
      "ÁLYSSON IGOR RODRIGUES LEITE",
      "GEOVANE DA ROCHA SILVA",
      "QUEZIA JAIME DE JESUS",
      "DANILO BARBOSA LIMA DE SANTANA",
      "CLEITON RODRIGUES DE OLIVEIRA",
      "JOAO MARCOS VILELA LOPES",
      "JOÃO VITOR DE ARAÚJO CUNHA",
      "ANDRESSA PATRICIA SOARES DE CASTRO",
      "RAFAEL THEODORO SERPA",
      "ALBERTO JOSÉ PAIM DE LIMA FILHO",
      "ALINE STEFANI LIMA OSTEMBERG",
      "ELIS FERNANDA DA SILVA OLIVEIRA",
      "AMANDA DOURADO ESPINDOLA",
      "PAULO ANDRÉ ARGERIN ROSSATTO",
      "BÁRBARA RIBEIRO REMONTI",
      "EVANIA CUSTÓDIO LOPES",
      "GABRIEL MATHEUS GOUVEIA DE LIMA",
      "TAINÁ MARQUES TABORGA SANDIM",
      "PALOMA GRAZIELLI GOMES DOS ANJOS",
      "BRIAN GIROTTO",
      "GLEICI FERREIRA FURMAN",
      "DANIEL CHAVES MARTINS",
      "IZAMARA CASADIA",
      "DOUGLAS SOUSA TOSTA",
      "VINICIUS EDUARDO DE ALMEIDA SANTOS",
      "PATRICK EMERSON DA COSTA",
      "FÚLVIO SOUZA DE SOUZA",
      "ALANA DE SOUSA OLIVEIRA GAMARRA",
      "CARLA REBECCA BARRETO DE AGUIAR ESTEVES",
      "LUCIO VINICIUS SANTOS DE SOUZA",
      "EDILENE DA SILVA MALDONADO",
      "HERICK PEREIRA MAGALHAES",
      "DOUGLAS BRITO DE OLIVEIRA",
      "BRUNO JESUS DOURADO",
      "KAWAM GABRIEL RODRIGUES CAMPOS",
      "THIAGO VINICIUS FONSECA DE OLIVEIRA",
      "DANIELY SILVA DE ALBUQUERQUE",
      "ANGÉLICA FREIRE BETTENCOURT",
      "LEANDRO CARVALHO DE SOUZA",
      "AUGUSTO DE ALMEIDA DAMASCENO",
      "RENATO OSSUNA DA SILVA",
      "JEFFERSON CANABARRA PEIXOTO",
      "LUCIANO JUNIOR TORALE GONÇALVES",
      "LUCAS HENRIQUE DE SENA MARQUES",
      "FLAVIO ALVES RIBEIRO",
      "WILLIAN DE OLIVEIRA PAPA",
      "JAIANE DAYCI SILVA",
      "GABRIEL DE OLIVEIRA ANTUNES",
      "WESLEY SOUZA ALMEIDA",
      "GABRIELA CAROLINE DE SOUZA",
      "NATHALY GONÇALVES LEITE LIMA",
      "LIENE CRISTINA DE OLIVEIRA RODRIGUES MOREIRA",
      "RENAN PEREIRA COIMBRA",
      "REGINALDO MULLER PINTO GEROLIN",
      "DAMIAO CABOCLO DA SILVA",
      "MARCOS HENRIQUE DA CUNHA FRANCO",
      "NEYENNE CALDEIRA ROCHA LOPES",
      "LEONARDO SANTOS CORREIA",
      "CELINO MAGALHÃES FILHO",
      "MOZANE EVELIN VILELA TEODORO",
      "ARTHUR RODRIGUES DE MENDONCA",
      "WELLINTON MENEZES GRANCE",
      "ALESSANDRO GONÇALVES DA SILVA",
      "THIAGO WOTEKOSKI IGLESIAS",
      "FÁBIO ANDRADE DOS SANTOS SILVA",
      "KARTHYLITH RODRIGUES VIANNA",
      "MARCELO HENRIQUE NOGUEIRA DOS SANTOS",
      "JEOVANA LIMA GAVILAN",
      "MUNIR SAMI CAMPITELLI IBRAHIM",
      "GABRIEL RODRIGUES DE OLIVEIRA",
      "ALICE DOS SANTOS SAAB",
      "LADY MARIA CANHETE CONTRERA",
      "EDLENE DE SOUZA HAVEROTH",
      "MARLON GABRIEL DE SOUZA SILVA",
      "LARISSA CRUZ LOPES",
      "TAMIRES RAQUEL AGUIRRE AREVALO",
      "DIEGO BENEDITO DA SILVA MOREIRA",
      "LUANA MARIA SANDIM SANTOS",
      "ALEX LIMA DE SOUZA",
      "MURILO DE SOUZA RODRIGUES",
      "LUIZ HENRIQUE COSTA DE OLIVEIRA",
      "LINCON EDER RIBEIRO VALVERDE",
      "ANDREY JEVERSON PEREIRA DA SILVA MORAIS",
      "ANDRESSA SOUSA SANTOS COQUEIRO",
      "JOSHUAN SOUSA VALDEZ",
      "FERNANDO PEREIRA SALES",
      "VINICIUS DE ARAUJO MARQUES",
      "JESSIKA RIBEIRO MIMOSO",
      "ANA CAROLINA ORMOND DE SOUZA CARVALHO",
      "MURILO HENRIQUE BEZERRA ARAÚJO",
      "DANIEL GUTTEMBERG FERREIRA DE BRITO",
      "LUCAS XAVIER DE SOUZA OBA (SUB JUDICE)",
      "ANDRESSA DA SILVA LOVERA",
      "JOAO PEDRO MACHADO NERES",
      "BRUNA PEREIRA SCHUMANN",
      "LUIZ FERNANDO MILAGRES ALVES",
      "MAYCON FERNANDO DA GLORIA TOLEDO",
      "DAVID RODRIGUES RIBEIRO",
      "LUANA SCHUBERT",
      "RAFAEL PERES RAMIRO",
      "LUDSON DE LIMA VARGAS",
      "ALAN DA SILVA CASAL BATISTA",
      "THIAGO RAMOS DE LIMA",
      "JOÃO PEDRO DIM BERGI",
      "DJALMA HENRIQUE REZENDE VEIGA",
      "GISELE MARQUES DA SILVA",
      "RAFAELA VIEIRA NEIVA",
      "LEONARDO FELIPE DE ALMEIDA",
      "VINNICIUS SILVA BORGES",
      'WILLIA LINO SOUZA',
      'ABIMAEL CORREIA MARQUES',
      'GELSON FIRMO',
      'PAULO RICARDO DA SILVA DE FREITAS',
      'MARCELO PIMENTA DA SILVA',
      'VINICIUS ROVARI DE CRISTO',
      'MURILO HENRIQUE MEDEIROS ROSA',
      'JÉSSYCA ELLEN WEISSINGER',
      'HENRIQUE BISPO VAZ',
      'PABLO GIOVANE DE OLIVEIRA DE SOUZA MALDONADO',
      'JESSICA HILLARY MELO SOBRINHO',
      'LAURA FÉLIX BARBOSA',
      'JÉFERSON SALLA',
      'ULPIANO JACQUET FILHO',
      'RÂNILY RIBEIRO GRAÇA',
      'CAMILA DE SOUZA GONÇALVES',
      'FELIPE MARTINS DE SOUZA COSTA',
      'JEAN LUCA DOS REIS BOBADILHA',
      'SIDNEI GONÇALVES ORTEGA',
      'MATEUS PENHA RIBEIRO DA SILVEIRA',
      'MAURO VIEIRA DA COSTA',
      'TALICIA CAMILA BEZERRA CARVALHO',
      'DÉBORA DE SOUZA FERREIRA',
      'BRENDA FERREIRA CARÍSSIMO PICORELLI',
      'INGRIT AMARANTE SABINO DE OLIVEIRA',
      'JOÃO GABRIEL MENDES CHAVES',
      'BRUNO FERREIRA PERES',
      'JÔNATAS TRIUNFO DA SILVA NASCIMENTO',
      'VITOR NANTES LEMOS',
      'FELIPE BARROS GARCIA',
      'ALISSON VINICIUS DA SILVA LIMA',
      'VINÍCIUS MORAES MENEZES',
      'ISRAEL PINTO DA SILVA FILHO',
      'GUSTAVO METELLO',
      'EVELLYN MARTINEZ MAIA',
      'BRUNO PEREIRA CARVALHO BARBOSA',
      'ALÉCIO ANDRADE LEITE',
      'BRUNA LARISSA GONÇALVES PIRES',
      'FELIPE REZENDE DE OLIVEIRA LIMA',
      'NATHALIA GONÇALVES DA SILVEIRA',
      'GUSTAVO HENRIQUE MEDEIROS DE OLIVEIRA',
      'MISAEL LIMA DE MESQUITA JÚNIOR',
      'DANIEL KERESTESI FREIRE',
      'LAERCIO CASSEL DOS SANTOS',
      'DIEGO HENRIQUE DA SILVA CARVALHO',
      'ANDRESSA BATISTA ESPIRITO SANTO',
      'RIVELTON SILVA DE MORAES',
      'CAIQUE GOMES DE OLIVEIRA',
      'NATHALIA YASMINE TOLENTINO VILELA',
      'NAYANNE RODRIGUES GERVASIO',
      'ANA JÚLIA BARBOSA AGUILERA',
      'CAIO LUCAS OLIVEIRA ANDRADE',
      'ANDRESSA PORTO DE OLIVEIRA',
      'MATEUS DAVID DUTRA PEREIRA',
      'CRISTIANE MATOS DA SILVA',
      'LUCAS MENDONÇA VARGAS',
      'WUILKER RAFAEL DA SILVA GARCIA',
      'CARLOS EDUARDO DOS SANTOS DIAS',
      'LEONARDO BRUNO FERNANDES MOREIRA',
      'INARA FREITAS DO NASCIMENTO',
      'KENIA ROCHA TAVARES',
      'IVAN TOBIAS DE OLIVEIRA',
      'EDUARDO SILVEIRA DAMACENO',
      'PAULO CESAR DE SOUZA NOVAES',
      'WESLEY JOAO RODRIGUES',
      'TÉRCIO ARÉVALO DE AQUINO',
      'ALAN NUNES DE SOUZA',
      'LUIZ EDUARDO DE JESUS GUEDES',
      'ANTONIO LUAN DE LIMA',
      'LEANDRO DIAS CATELLAN TEIXEIRA',
      'VINICIUS HENRIQUE GONÇALVES PORTILHO',
      'LUCAS VINÍCIUS ALMIRON DOS SANTOS',
      'WENDER PEREIRA',
      'HIGOR RODRIGUES OLIVEIRA',
      'VINICIUS CORREA BIANCO',
      'IARA APARECIDA RIBEIRO',
      'KAROLINE MELO DE OLIVEIRA PI FERRARIO',
      'FERNANDO HENRIQUE ASSIS DE ANDRADE',
      'LETICIA DANTAS DA SILVA (SUB JUDICE)',
      'RAFAEL FERREIRA SEGUNDO',
      'DANIEL MACEDO MATOS DA SILVA',
      'GUSTAVO HENRIQUE DOS SANTOS NOETZOLD',
      'GABRIEL FELIX CABRAL',
      'MILENE SILVA LIMA BOMFIM',
      'INGRID TUANNE DO CARMO DIAS',
      'CAIO DA SILVA LAGUNA',
      'MARCUS VINYCIUS LOURENÇO FERREIRA',
      'JÉSSICA AYUMI UEHARA AGUILERA',
      'BRUNO HENRIQUE DA SILVA MARTINS',
      'RENAN WILSON VARANIS DA SILVA',
      'RENATO STOCO DE MACHADO',
      'RENATO DE ALENCAR RICALDES',
      'LUANY THAYNARA LOUZAN',
      'ADAILTON PIRELI COSTA',
      'IGOR CESAR SEVERO ANTUNES',
      'LUCAS LINCOLN DE OLIVEIRA MATSUMOTO',
      'BRUNA CAMILA AJALA ARALDI',
      'VINICIUS ARAUJO SOARES',
      'JEAN MARCOS FRANCO DE SOUZA',
      'VINICIUS GUIMARAES DE CARVALHO',
      'WILIAN OLIVEIRA DE FREITAS',
      'FERNANDO NUMERIANO DE OLIVEIRA',
      'LUCAS CALIXTO PAZ BEZERRA',
      'KELLY CRISTINA CÂNDIDO DOS SANTOS',
      'ISABELA DE OLIVEIRA DA RIVA',
      'WEVERTON GABRIEL DE BARROS MARQUES',
      'WEVERTTON CRISTIANO ANJOS DOS SANTOS',
      'LUCAS DIAS PINHEIRO',
      'JAILZON DA SILVA RODRIGUES',
      'MARCEL JUNIO DA SILVA SOUZA',
      'MAILSON FRANCISCO DA SILVA',
      'MARCOS AUGUSTO DE SOUSA',
      'KAIO LIMA DA SILVA',
      'RUBIANY VASCONCELOS DUARTE',
      'ALAN CARLOS MIRANDA DE OLIVEIRA CRUZ',
      'RONALDO MENÃO JESUS',
      'JULIA BEATRIZ PAZ PEDROSO',
      'ULISSES GUIMARÃES SANCHES',
      'GERALDO CLAUDIO PEREIRA',
      'CLEBER DA SILVA RAMIREZ',
      'MARIANA PEREIRA DE ALMEIDA',
      'PEDRO PAULO MACHADO RODRIGUES',
      'JOICE CRISTINA MORENO FERNANDES',
      'JOÃO VICTOR FAGUNDES SILVA',
      'NICOLE BEZERRA VAZ',
      'BEATRIZ DA SILVA PIMENTA',
      'RANON LOURAN DO ESPIRITO SANTO COSTA',
      'MAYSE RICE SILVEIRA CARDOSO',
      'OSVALDO GONZALEZ',
      'MIRA CELI NAZARE DIAS BASILIO',
      'STEFFANO MINGOTTI DIAS',
      'VITOR DA SILVA LIMA',
      'MURILO DE LIMA SILVA',
      'RAPHAELA HELOÍNA SCHIEMANN',
      'FELIPE WELLINGTON DE OLIVEIRA SOUSA',
      'MARINARA ALEXANDRE DA SILVA',
      'TIAGO WISENFAD LOPES',
      'ANDRÉ LUIZ PEREIRA LEITE JUNIOR',
      'EDINEI MACHADO DE ALMEIDA',
      'PAULO HENRIQUE FERREIRA DO NASCIMENTO',
      'ALDAIR CANUTO DO NASCIMENTO',
      'FABRÍCIO PALMEIRA RIOS SANTOS',
      'ADNA DA SILVA RABELLO',
      'LÉO DE MEDEIROS GUIMARÃES NETO',
      'ANA CAROLINA MUGARTE POTRICH',
      'LUCAS BRYAN ALENCAR DE OLIVEIRA',
      'RODRIGO DA ROCHA ROSATI',
      'MARTINHO EDUARDO PEREIRA FILHO',
      'JULIANA DE REZENDE DE SOUZA',
      'JOSE ROBSON SANABRIA TRINDADE',
      'RAYANI BARROS FREITAS',
      'DANIELA OLIVEIRA DE SOUZA',
      'FLÁVIO LUIS VILLALBA URQUIZA JUNIOR',
      'GLADISON BEZERRA VIEIRA',
      'VINÍCIUS ARGEMON PEREIRA BENITES',
      'LUIZ HENRIQUE ALVES DE OLIVEIRA',
      'MATEUS PINHEIRO DE OLIVEIRA',
      "JÉSSICA FERREIRA CESCON",
      "DANIELLE DOS SANTOS SOUZA",
      "AUGUSTO GAMEIRO",
      "THIAGO FAGUNDES LEMOS",
      "JOSÉ EDUARDO DUARTE DA SILVA",
      "ICARO ALMEIDA LEMOS ALVES",
      "LAURO DALAQUA JUNIOR",
      "FERNANDO JORGE DE LIMA",
      "ANA PAULA REZENDE DOS SANTOS",
      "SINDI SABRINA PEDROSO CUBILLA",
      "GUSTAVO DA SILVA APARECIDO",
      "SAMUEL LUCAS DINIZ",
      "CLEBER DA SILVA",
      "DANIEL ALMADA MESSA",
      "DANILO EUGÊNIO FERREIRA MORAES",
      "RAFAELY CARVALHO ALVES",
      "VIVIANE INEZ SATIRITO SILVESTRE",
      "GLEIDSON SOUZA CARVALHO",
      "RAUL DO AMARAL VIEIRA",
      "GABRIELLA GAZOLA DE MELO",
      "JUNIO FERREIRA DA SILVA",
      "CARLOS PEDRO MEIATO DA SILVA",
      "ALISON PERIRA BRAGA",
      "LEANDRO BARROS SCHENCKNECHT",
      "BRUNA FERREIRA GARBIN",
      "GABRIEL MARTINS DUARTE",
      "SANNY MARA DOS SANTOS LIMA",
      "LARISSA DOS SANTOS COSTA",
      "ANAY CRYSTYNA FREITAS DE SOUZA",
      "HENRIQUE DE SOUZA SANTOS",
      "MATHEUS ALMEIDA DE MOURA MONTEIRO DE OLIVEIRA",
      "FERNANDA ANTUNES REZENDE",
      "LUCAS COSTA SOARES",
      "EMILLY DE LIMA MORAES",
      "RAFAEL MADEIRA DE OLIVEIRA",
      "ÉRICA FREITAS ROJAS VIEIRA",
      "NATALIA ESTER CORREA RAMALHO",
      "VITOR AUGUSTO SOUZA DE CARVALHO",
      "SAYURI HIRASAKA",
      "LETHICIA MEGAIOLI DE OLIVEIRA",
      "ADEANDREA PEIXOTO MORAES SANTANA",
      "WILLIAN COSTA DIAS",
      "ALEXANDRE ROSA FLORES",
      "LUIZ PEGORARO JUNIOR",
      "DANILO MACIEL DE LIMA",
      "THIAGO DA SILVA MARTINS",
      "PÂMELA FERNANDES PEREIRA",
      "JUNIOR HOINOSKI CORDEIRO",
      "DIEGO PEREIRA COELHO",
      "LUIZ HENRIQUE SILVA DOS SANTOS",
      "RAIANE DA SILVA",
      "BIANCA MARQUES DOS SANTOS",
      "HARYSON LUCAS DE SOUZA JORGE",
      "PETRONIO NERES DA SILVA",
      "LUANA NEVES DA SILVA",
      "MUNYR LUNA BARION",
      "RODRIGO ORRO DE CAMPOS VIEGA",
      "JÓ NOÉLCIO ANOAR DE MELO ÁVILA",
      "REGIANE VITORIA PERIN ORTEGA",
      "BRUNO GRACINI MACEDO",
      "JOILHAN KELVIS DE ASSIS PIRES",
      "RAFAEL ANGELOZI DE SOUZA",
      "JEAN CARLOS DE FREITAS DA SILVA",
      "PEDRO HENRIQUE FUZARIO CUSTODIO",
      "WESLEN DOS SANTOS RESENDE",
      "JEFERSON ROLON DE ASSIS",
      "FARNEY MENDES FONTOURA",
      "MATHEUS ANDRIU DE MIRANDA SILVA",
      "JÉFITON DE SOUZA POLIDÓRIO",
      "MATHEUS HENRIQUE DE LIMA VILELA",
      "EZIEL DO AMARAL CENTURION",
      "ABIMAEL VICENTE DE SOUZA MACHADO",
      "WAGNER ALVES PEREIRA",
      "PAULLIANE MARTINS SOUZA",
      "JEFERSON SAUCEDO AMORIM",
      "WILLIAN VILLAMAYOR FERNANDES DA SILVA",
      "DIEGO DA SILVA SOUZA",
      "LUCAS VAZ NEMEZIO DA SILVA SILVEIRA",
      "ANA PAULA FORTES",
      "PAMELA FERRAZ DE ALBUQUERQUE",
      "WENDERSON DA SILVA CAVALCANTE",
      "THÉCIA LOURENÇO FURTADO",
      "ALISSON ARAUJO FERREIRA",
      "GABRIEL ABRAHÃO GOMES DE OLIVEIRA",
      "FUAD ALESSANDRO GONÇALVES DA ROCHA",
      "RODRIGO ONOFRE MAURER TAVARES",
      "RAFAEL TORQUATO DE ESCOBAR",
      "AMANDA DA SILVA GOMES",
      "FABRICIO SANTOS E COSTA SALGADO",
      "MATHEUS DOS SANTOS PITOL",
      "LEONARDO DA ROSA AIVI",
      "GIULLIAN BATISTA VIALLE",
      "LINCOLN CALISTRO BERRO",
      "JOSE GOMES PEREIRA NETO",
      "NATALIA EVELIN ALVES DOS REIS",
      "ISABELLA FIDELIS",
      "CARLOS EDUARDO DA SILVA FILHO",
      "MATHEUS FERREIRA SONOHATA",
      "RAPHAEL VILALVA DE QUEIROZ",
      "LUCAS OVELAR LEME",
      "EDUARDO SANTANA DE MOURA SOUSA",
      "WELLINGTON FLORES DE CASTRO",
      "LUIZ HENRIQUE SCHORN",
      "TIAGO ANDRE DA SILVA DIAS",
      "CÁSSIO SALES CASSIMIRO",
      "LUCIANE OLIVEIRA PORTELA PISSINI",
      "LUIS HENRIQUE SILVA LEAO",
      "GABRIEL SCHMITT SCHROEDER",
      "DANIEL NUNES GUIMARÃES",
      "JULIO CESAR SECCATTO",
      "FERNANDA MORTARI VÉGAS",
      "DEIVID AN MARTINS DE ARRUDA",
      "MARCOS ELOY GIRON",
      "THIAGO APARECIDO RAMOS PERTILE",
      "LAURIELENE ELEN ARRUDA SILVA DEODATO",
      "HELOÍSA POLACCHINE LEITE",
      "BÁRBARA MARINHO AZEVEDO",
      "CRISTHIAN FREITAS BATISTA",
      "JULIO CESAR TORRES JUNIOR",
      "RAUL MURILO CAMACHO SEBA",
      "POLYANA JESSYCA FELISARDO GONÇALVES WRUCK",
      "CARLOS HENRIQUE CABANHAS DE OLIVEIRA",
      "FANI ELIZABETH OJEDA",
      "JOSÉ FERNANDO MANZIONE PAES DE BARROS",
      "CAIO ALEXANDRE NAVARRO ANTONIO",
      "MIKAEL DOS SANTOS ORTIZ",
      "CARLOS EDUARDO MARTINS SILVA",
      "GABRIEL FLORENCIANO FERREIRA",
      "ADEILSON RODRIGUES FARIA",
      "WATSON LIMA DA SILVA",
      "LEONARDO PANIAGO TEODORO ALMEIDA",
      "LUAN MATHEUS DA SILVA AMORIM",
      "JOSÉ EUCLIDES DA SILVA NETO",
      "MICHELE KUCHAR MATTE",
      "CAMILA SANTIAGO DA SILVA",
      "WANDERLEY CAMPOS PEREIRA JUNIOR",
      "RHAIANA BORGES PEREIRA",
      "PAMELA APARECIDA AZEVEDO DE PAULA",
      "HUENDER LUCAS FARIAS DE SOUSA",
      "LUCAS BARROS GARCIA",
      "LUIZ FELIPPE ANTUNES RIBEIRO",
      "NATÁLIA GODOI DE OLIVEIRA FAGUNDES",
      "MICHAEL CARMONA DE ALMEIDA",
      "DANIEL PAREDES DE FRANÇA",
      "MILLENA CHRISTINE DEZAN DA FONSECA",
      "WANDERSON BACH QUEIROZ",
      "RENAN MAMEDES DELMÃO DE SENA",
      "LARISSA IARA ALEM DE OLIVEIRA",
      "THAIS FERREIRA MENDES",
      "BEATRIZ CARVALHO SOTTOLANO",
      "JANAINA OLIVEIRA LACERDA",
      "HAVANA FARDIM DA GAMA"
    ];

    const [nomesUsuarios, setNomesUsuarios] = useState([]);

    async function fetchNomesUsuarios() {
      try {
        const snapshot = await getDocs(collection(db, 'users'));
        const nomes = snapshot.docs.map(doc => ({
          nome: doc.data().nome,
          id: doc.id
        }));
        setNomesUsuarios(nomes);

        // console.log(`Nomes dos usuários: ${nomes.map(user => user.nome).join(', ')}`, { className: 'toast-info' });
      } catch (error) {
        console.error('Erro ao buscar nomes de usuários:', error);
        // toast.error("Erro ao buscar nomes de usuários!", { className: 'toast-error' });
      }
    }

    function verificarUsuariosNaoListados() {
      const nomesNaoListados = nomesUsuarios
        .filter(user => !nomesCandidatos.includes(user.nome))
        .map(user => ({ nome: user.nome, id: user.id }));

      if (nomesNaoListados.length > 0) {
        // console.log('Usuários não listados:', nomesNaoListados);
        // console.log(`Usuários não listados : ${nomesNaoListados.map(user => `${user.nome} (ID: ${user.id})`).join(', ')}`, { className: 'toast-info' });
      } else {
        // console.log('Todos os usuários estão na lista de candidatos.');
        // toast.info('Todos os usuários estão na lista de candidatos.', { className: 'toast-info' });
      }
    }

    // Você pode chamar fetchNomesUsuarios e verificarUsuariosNaoListados em useEffect
    useEffect(() => {
      fetchNomesUsuarios();
    }, []);

    // async function atualizarNomesParaMaiusculas() {
    //   try {
    //     // Busca todos os documentos da coleção 'users'
    //     const snapshot = await getDocs(collection(db, 'users'));
        
    //     // Percorre todos os documentos
    //     const updatePromises = snapshot.docs.map(async (docSnap) => {
    //       const userId = docSnap.id;
    //       const userData = docSnap.data();
    
    //       // Converte o nome para maiúsculas
    //       const nomeMaiusculo = userData.nome.toUpperCase();
    
    //       // Atualiza o documento com o nome em maiúsculas
    //       const docRef = doc(db, 'users', userId);
    //       return updateDoc(docRef, { nome: nomeMaiusculo });
    //     });
    
    //     // Aguarda todas as atualizações serem concluídas
    //     await Promise.all(updatePromises);
    
    //     toast.success('Nomes atualizados para maiúsculas com sucesso!', { className: 'toast-success' });
    //   } catch (error) {
    //     console.error('Erro ao atualizar nomes:', error);
    //     toast.error('Erro ao atualizar nomes!', { className: 'toast-error' });
    //   }
    // }

    const products = [
      {
        id: 1,
        nome: "Pré-treino Hor...",
        preco: 1,
        quantidade: 1,
        imagem: require('../assets/produtos/horus-300-frutas-vermelhas.png'),
      },
      {
        id: 2,
        nome: "Barrinha Brownie",
        preco: 1,
        quantidade: 1,
        imagem: require('../assets/produtos/barrinha-brownie-black-skull.png'),
      },
      {
        id: 3,
        nome: "Whey Isolado Nutrata",
        preco: 1,
        quantidade: 1,
        imagem: require('../assets/produtos/whey-isolado-nutrata-900-chocolate.png'),
      }
    ];

    const [itens, setItens] = useState([]);

    const calcularTotal = () => {
      return itens.reduce((total, item) => total + (item.preco * item.quantidade), 0);
    };

    
    const adicionarItem = (id) => {
      const novoItem = products.find(item => item.id === id);
      const itemExistente = itens.find(item => item.id === id);
    
      if (itemExistente) {
        const novosItens = itens.map(item => {
          if (item.id === id) {
            return { ...item, quantidade: item.quantidade + 1 };
          }
          return item;
        });
        setItens(novosItens);
      } else {
        setItens([...itens, { ...novoItem, quantidade: 1 }]);
      }
    };
  
    const removerItem = (id) => {
      const novosItens = itens.filter(item => item.id !== id);
      setItens(novosItens);
    };
  
    const diminuirQuantidade = (id) => {
      const novosItens = itens.map(item => {
        if (item.id === id && item.quantidade > 1) {
          return { ...item, quantidade: item.quantidade - 1 };
        }
        return item;
      });
      setItens(novosItens);
    };
  
    const alterarQuantidade = (id, quantidade) => {
      const novosItens = itens.map(item => {
        if (item.id === id) {
          return { ...item, quantidade: quantidade };
        }
        return item;
      });
      setItens(novosItens);
    };




    





    useEffect(()=>{
      async function loadUser(){
        const storageUser = localStorage.getItem('@AuthUsers')
        if(storageUser){
          setUser(JSON.parse(storageUser));
          setLoadingAuth(false);
        }

        setLoadingAuth(false);
      }
      loadUser();
    },[])


    // async function signIn(email, password){
    //    setLoadingAuth(true);
    //    await signInWithEmailAndPassword(auth, email, password) 
    //    .then( async(value)=>{
    //       let uid = value.user.uid;

    //       const docRef = doc(db, "users", uid);
    //       const docSnap = await getDoc(docRef);

    //       let data = {
    //         uid: uid,
    //         nome: docSnap.data().nome,
    //         email: value.user.email,
    //         cidadeprimeira: docSnap.data().cidadeprimeira,
    //         cidadesegunda: docSnap.data().cidadesegunda,
    //         classificacao: docSnap.data().classificacao,
    //         avatarUrl: docSnap.data().avatarUrl
    //       };
          
    //       setUser(data);
    //       storageUser(data);
    //       setLoadingAuth(false);
    //       toast.success("Bem-vindo de volta!");
    //       navigate("/home");
    //    })
    //    .catch((error)=>{
    //       console.log(error);
    //       setLoadingAuth(false);
    //       toast.error("Ops, algo deu errado!");
    //    })
    // }

    async function signIn(email, password) {
      setLoadingAuth(true);
    
      try {
        const value = await signInWithEmailAndPassword(auth, email, password);
        const uid = value.user.uid;
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
    
        const nome = docSnap.data().nome;
    
        // Atualize a lista de nomes de usuários antes de verificar
        await fetchNomesUsuarios();
    
        const nomeCandidato = nomesCandidatos.includes(nome);
        
        if (!nomeCandidato) {
          toast.warning(`Seu nome "${nome}" não está na lista de candidatos!`, { className: 'toast-warning' });
        }
    
        let data = {
          uid: uid,
          nome: nome,
          email: value.user.email,
          cidadeprimeira: docSnap.data().cidadeprimeira,
          cidadesegunda: docSnap.data().cidadesegunda,
          classificacao: docSnap.data().classificacao,
          avatarUrl: docSnap.data().avatarUrl
        };
    
        setUser(data);
        storageUser(data);
        toast.success("Bem-vindo de volta!");

        navigate("/home");
      } catch (error) {
        console.log(error);
        toast.error("Ops, algo deu errado!");
      } finally {
        setLoadingAuth(false);
      }
    }
    

    // async function signUp(email, password, name, classificacao, cidadeprimeira, cidadesegunda){
    //     setLoadingAuth(true);
    
    //     await createUserWithEmailAndPassword(auth, email, password)
    //     .then( async (value) => {
    //         let uid = value.user.uid
    
    //         await setDoc(doc(db, "users", uid), {
    //           nome: name,
    //           classificacao: classificacao,
    //           cidadeprimeira: cidadeprimeira,
    //           cidadesegunda: cidadesegunda,
    //           avatarUrl: null
    //         })
    //         .then( () => {
    
    //           let data = {
    //             uid: uid,
    //             nome: name,
    //             email: value.user.email,
    //             cidadeprimeira: cidadeprimeira,
    //             cidadesegunda: cidadesegunda,
    //             classificacao: classificacao,
    //             avatarUrl: null
    //           };
    
    //           setUser(data);
    //           storageUser(data);
    //           setLoadingAuth(false);
    //           toast.success("Seja bem-vindo ao sistema!");
    //           navigate("/home");
    //         })
    
    
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //       if (error == "FirebaseError: Firebase: Error (auth/email-already-in-use)."){
    //         toast.error("Erro: E-mail já utilizado.", { className: 'toast-error' });
    //       }else{
    //         toast.error("Erro: Verifique suas informação!", { className: 'toast-error' }); 
    //       }
         
    //       setLoadingAuth(false);
    //     })
    
    //   }

    async function signUp(email, password, name, classificacao, cidadeprimeira, cidadesegunda) {
      setLoadingAuth(true);
    
      // Verifica se o nome está na lista de candidatos
      if (!nomesCandidatos.includes(name)) {
        toast.error(`Nome "${name}" não está na lista de candidatos!`, { className: 'toast-error' });
        setLoadingAuth(false);
        return; // Interrompe o processo de cadastro
      }
    
      try {
        const value = await createUserWithEmailAndPassword(auth, email, password);
        const uid = value.user.uid;
    
        await setDoc(doc(db, "users", uid), {
          nome: name,
          classificacao: classificacao,
          cidadeprimeira: cidadeprimeira,
          cidadesegunda: cidadesegunda,
          avatarUrl: null
        });
    
        let data = {
          uid: uid,
          nome: name,
          email: value.user.email,
          cidadeprimeira: cidadeprimeira,
          cidadesegunda: cidadesegunda,
          classificacao: classificacao,
          avatarUrl: null
        };
    
        setUser(data);
        storageUser(data);
        toast.success("Seja bem-vindo ao sistema!");
        navigate("/home");
      } catch (error) {
        console.log(error);
        if (error.code === "auth/email-already-in-use") {
          toast.error("Erro: E-mail já utilizado.", { className: 'toast-error' });
        } else {
          toast.error("Erro: Verifique suas informações!", { className: 'toast-error' });
        }
      } finally {
        setLoadingAuth(false);
      }
    }
    
    
      function storageUser(data){
        localStorage.setItem('@AuthUsers', JSON.stringify(data));
      }

      async function logout(){
        await signOut(auth);
        localStorage.removeItem('@AuthUsers');
        setUser(null);
      }

    return(
        <AuthContext.Provider
            value={{
                signed: !!user,
                user,
                setUser,
                storageUser,
                signIn,
                signUp,
                logout,
                setLoadingAuth,
                loadingauth,
                loading,
                itens,
                calcularTotal,
                adicionarItem,
                removerItem,
                diminuirQuantidade,
                alterarQuantidade,
                products
            }}  
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;