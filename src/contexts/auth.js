import {useState, createContext, useEffect} from 'react';
import {auth, db} from '../services/firebaseConection';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, deleteUser, listUsers, signOut } from 'firebase/auth';
import { doc, getDoc,deleteDoc, query, where, setDoc, collection, getDocs, updateDoc} from 'firebase/firestore';
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
      "LARISSA ARGUILERA DE PAULA",
      "LUDIÉR MARIANO ROSA",
      "BRUNO MACIEL GARCIA",
      "VIVIANE CASSEMIRO DE ALMEIDA CANEPA",
      "VÍTOR DA ROCHA DIAS DUARTE",
      "CAMILA DA SILVA CALIXTO AGUIRRE",
      "PEDRO GABRIEL TELES BARBOSA",
      "WESLEY ALVES COSTA",
      "CLAUDIELI TANARA WOTTRICH TIMM",
      "IGOR DE OLIVEIRA SALINA",
      "LUCAS FIGALE CARDOSO",
      "ARTHUR ARAUJO DO NASCIMENTO",
      "MONIQUE ORTIZ SANTANA",
      "LUIS FERNANDO PEREIRA PINTO",
      "ALINE GOMES GONÇALVES",
      "MELANY ESTEVAO BARBOSA SOARES",
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
      "MARIA ESTELA DA SILVA CASANOVA",
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
      "VANESSA MENDES DA SILVA DE OLIVEIRA",
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
      "MICHAEL FRANCISCO DA SILVA",
      "GIOVANI TEIXEIRA DA SILVA",
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
      "LUCAS XAVIER DE SOUZA OBA",
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
      'LETICIA DANTAS DA SILVA',
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

    const nomeCandidatosClassificacao = [
      { nome: 'Janaina Oliveira Lacerda', classificacao: 1 },
      { nome: 'Edson Augusto Alves Da Silva', classificacao: 2 },
      { nome: 'Fernando Agues De Oliveira', classificacao: 3 },
      { nome: 'Gleiciane Santos Costa', classificacao: 4 },
      { nome: 'Pedro Elias Da Silveira', classificacao: 5 },
      { nome: 'Henrique Lima Dos Santos', classificacao: 6 },
      { nome: 'Lucas Matheus Barbosa Deoliveira', classificacao: 7 },
      { nome: 'João Victor Francisquett Dos Santos', classificacao: 8 },
      { nome: 'Mauri Kehl Junior', classificacao: 9 },
      { nome: 'Vinicius Moretti De Paula', classificacao: 10 },
      { nome: 'Reuhel Da Silva Cavalcante', classificacao: 11 },
      { nome: 'William Marcari Ribeiro Barros', classificacao: 12 },
      { nome: 'Julio Cesar Silva Rodrigues', classificacao: 13 },
      { nome: 'Larissa Aryane Galvão', classificacao: 14 },
      { nome: 'Thayloane Souza Da Silva Luz', classificacao: 15 },
      { nome: 'Luciene Sales Dos Santos', classificacao: 16 },
      { nome: 'Paulo Sérgio Akieda', classificacao: 17 },
      { nome: 'Fernanda Cardoso Wolf', classificacao: 18 },
      { nome: 'Renato Arthur Fabro Dos Santos', classificacao: 19 },
      { nome: 'Bruna Quezini Da Silva', classificacao: 20 },
      { nome: 'Alexsandra Carolina Guimarães De Oliveira', classificacao: 21 },
      { nome: 'Meiri Anita Nichetti Haach', classificacao: 22 },
      { nome: 'André Luiz Ferreira Da Silva', classificacao: 23 },
      { nome: 'Ronaldo Lopes Maciel', classificacao: 24 },
      { nome: 'Juliana Romeiro Salina', classificacao: 25 },
      { nome: 'Willian Dias Da Silva Junior', classificacao: 26 },
      { nome: 'Thiago Alberto Valle Do Nascimento', classificacao: 27 },
      { nome: 'Murilo Brendo Dias Lins', classificacao: 28 },
      { nome: 'Edmilson Camargo Da Silva', classificacao: 29 },
      { nome: 'Mariana Maria Rodrigues Zito', classificacao: 30 },
      { nome: 'Gustavo Cesar Domingues De Oliveira', classificacao: 31 },
      { nome: 'André De Lima Benteo', classificacao: 32 },
      { nome: 'Gabriela Ribeiro Mendonça Maldonado', classificacao: 33 },
      { nome: 'Lyncon Marques', classificacao: 34 },
      { nome: 'Rodrigo Alves Barros', classificacao: 35 },
      { nome: 'Vitoria Caroline Barboza Fernandes De Souza', classificacao: 36 },
      { nome: 'Elliot Jacques Lima', classificacao: 37 },
      { nome: 'Pedro Henrique Figueiredo Barbosa', classificacao: 38 },
      { nome: 'Edson Eduardo Fernandes Amarilha', classificacao: 39 },
      { nome: 'Wesley Mendonça De Brito Silva', classificacao: 40 },
      { nome: 'Carlos Henrique Alves Rodrigues', classificacao: 41 },
      { nome: 'José Gomes De Andrade Neto', classificacao: 42 },
      { nome: 'Osmar Vasques Gonzalez', classificacao: 43 },
      { nome: 'Cassiano Lucas Simplicio Batistote', classificacao: 44 },
      { nome: 'Larissa Arguilera De Paula (Sub judice)', classificacao: 45 },
      { nome: 'Ludiér Mariano Rosa', classificacao: 46 },
      { nome: 'Bruno Maciel Garcia', classificacao: 47 },
      { nome: 'Viviane Cassemiro De Almeida Canepa', classificacao: 48 },
      { nome: 'Vítor Da Rocha Dias Duarte', classificacao: 49 },
      { nome: 'Camila Da Silva Calixto Aguirre', classificacao: 50 },
      { nome: 'Pedro Gabriel Teles Barbosa', classificacao: 51 },
      { nome: 'Wesley Alves Costa', classificacao: 52 },
      { nome: 'Claudieli Tanara Wottrich Timm', classificacao: 53 },
      { nome: 'Igor De Oliveira Salina (Sub judice)', classificacao: 54 },
      { nome: 'Lucas Figale Cardoso', classificacao: 55 },
      { nome: 'Arthur Araujo Do Nascimento', classificacao: 56 },
      { nome: 'Monique Ortiz Santana', classificacao: 57 },
      { nome: 'Luis Fernando Pereira Pinto', classificacao: 58 },
      { nome: 'Aline Gomes Gonçalves', classificacao: 59 },
      { nome: 'Melany Estevao Barbosa Soares (Sub judice)', classificacao: 60 },
      { nome: 'Lucas De Oliveira Diniz', classificacao: 61 },
      { nome: 'Clovis De Souza Rocha', classificacao: 62 },
      { nome: 'Giovanny Souza Da Fonseca', classificacao: 63 },
      { nome: 'Ricardo Junior Alves Kurovski', classificacao: 64 },
      { nome: 'Alexandre Bernardes Gomes Da Silva', classificacao: 65 },
      { nome: 'Leandro Dos Santos Pereira', classificacao: 66 },
      { nome: 'Denner Douglas Medeiros Soares', classificacao: 67 },
      { nome: 'Edson Maximo Romero Junior', classificacao: 68 },
      { nome: 'Luiz Fernando Nunes', classificacao: 69 },
      { nome: 'Valleria Orso Valmini Siqueira', classificacao: 70 },
      { nome: 'Thaisson Oliveira Da Silva', classificacao: 71 },
      { nome: 'Johnne Alex Batista Gomes', classificacao: 72 },
      { nome: 'Nícolas Nogueira Duailibi', classificacao: 73 },
      { nome: 'Nicole Roda Rodrigues', classificacao: 74 },
      { nome: 'Douglas Soares Regini', classificacao: 75 },
      { nome: 'Lucas Anthony Alves Barros', classificacao: 76 },
      { nome: 'Fernanda Silva Marques', classificacao: 77 },
      { nome: 'Elivander Sanches Honorato', classificacao: 78 },
      { nome: 'Rewller Vianna Da Silva', classificacao: 79 },
      { nome: 'Bruno Vinicius Da Silva Abreu', classificacao: 80 },
      { nome: 'Anderson Barroso De Almeida', classificacao: 81 },
      { nome: 'Samuel De Souza Queiroz', classificacao: 82 },
      { nome: 'Daniella Ferreira Leite', classificacao: 83 },
      { nome: 'Raissa Maria Alves Vida', classificacao: 84 },
      { nome: 'Bruno Antonio Dos Reis', classificacao: 85 },
      { nome: 'Dalvan Bruno Ferreira Da Silva', classificacao: 86 },
      { nome: 'Maria Eduarda Avelino Prates', classificacao: 87 },
      { nome: 'Graciely Ferreira Rodrigues', classificacao: 88 },
      { nome: 'Cristina Schultz Kuhn', classificacao: 89 },
      { nome: 'Lorena Pereira De Souza', classificacao: 90 },
      { nome: 'Emerson Rodrigo Pereira Dos Santos', classificacao: 91 },
      { nome: 'Izabelle Souza Delaterra De Assis', classificacao: 92 },
      { nome: 'Ygor Garcia De Oliveira', classificacao: 93 },
      { nome: 'Albert Natan De Oliveira Medeiros', classificacao: 94 },
      { nome: 'Wesley Vinicius Bordas De Figueiredo', classificacao: 95 },
      { nome: 'Cleyton Cassiano Ribeiro Rodrigues', classificacao: 96 },
      { nome: 'Matheus Hemerson Nogueira Rodrigues', classificacao: 97 },
      { nome: 'Fernanda Caroline Batistoti Simas', classificacao: 98 },
      { nome: 'Eber De Morais Marinhas', classificacao: 99 },
      { nome: 'Larissa Fernandes De Souza', classificacao: 100 },
      { nome: 'Lucas Vinícius Conche De Souza', classificacao: 101 },
      { nome: 'Karolyne Freitas Nascimento', classificacao: 102 },
      { nome: 'Maria Estela Da Silva Casanova (Sub judice)', classificacao: 103 },
      { nome: 'Gabriele Bezerra Porto', classificacao: 104 },
      { nome: 'Brenda Rodrigues Ramires Ferreira', classificacao: 105 },
      { nome: 'Isabella Catarina Rodrigues Jacob', classificacao: 106 },
      { nome: 'Aline Szaubram', classificacao: 107 },
      { nome: 'Luiz Felipe Minussi Da Silva', classificacao: 108 },
      { nome: 'Adilson Antunes Martins', classificacao: 109 },
      { nome: 'Brendo De Jesus Da Silva', classificacao: 110 },
      { nome: 'Luciana Tinoco Machado', classificacao: 111 },
      { nome: 'Sergio Willimann De Souza', classificacao: 112 },
      { nome: 'Michele Petronilo Inzabral', classificacao: 113 },
      { nome: 'Marcelos Simão Basílio Sobrinho', classificacao: 114 },
      { nome: 'Lauana Elisa Ramalho De Souza', classificacao: 115 },
      { nome: 'Caio Boaventura Da Silva', classificacao: 116 },
      { nome: 'João Victor Guedes De Lima', classificacao: 117 },
      { nome: 'Herick Matheus De Souza Exteca', classificacao: 118 },
      { nome: 'Carla Caroline Pinto De Arruda', classificacao: 119 },
      { nome: 'Daniel De Jesus Araújo', classificacao: 120 },
      { nome: 'Fernanda Castelo Girard', classificacao: 121 },
      { nome: 'Lucas Nogueira Tote', classificacao: 122 },
      { nome: 'Stephanny Karoline Borges Sonchini', classificacao: 123 },
      { nome: 'Debora Brites Ribeiro De Brites', classificacao: 124 },
      { nome: 'Fagner Charles Ramos', classificacao: 125 },
      { nome: 'Siéslem Menezes Sanche Pérez', classificacao: 126 },
      { nome: 'Breno Rezende Rodrigues', classificacao: 127 },
      { nome: 'João Matheus Navarro Dos Santos', classificacao: 128 },
      { nome: 'Raquel Duarte Felipetto', classificacao: 129 },
      { nome: 'Éverton Schirmann Rosati', classificacao: 130 },
      { nome: 'Wenyberg De Mello Nunes', classificacao: 131 },
      { nome: 'Alana Jaqueline Bellini Oliveira', classificacao: 132 },
      { nome: 'Rodrigo Do Carmo Souza', classificacao: 133 },
      { nome: 'Igor Figueiró Do Amaral', classificacao: 134 },
      { nome: 'Emilaine Zorzi Leandro', classificacao: 135 },
      { nome: 'Thalison Moreira Gouveia', classificacao: 136 },
      { nome: 'Vinicius Brandao Borges', classificacao: 137 },
      { nome: 'Renan Nogueira Navarro', classificacao: 138 },
      { nome: 'Kevin Macalisrer Nogueira Barcellos', classificacao: 139 },
      { nome: 'Afonso Cabreira Leao', classificacao: 140 },
      { nome: 'Waldemar Santana Oliveira', classificacao: 141 },
      { nome: 'Naijara Da Silva Dias', classificacao: 142 },
      { nome: 'Ricardo Pereira Da Cruz Junior', classificacao: 143 },
      { nome: 'Abner Diniz Sampaio Dos Santos', classificacao: 144 },
      { nome: 'Lucas Batista Silva', classificacao: 145 },
      { nome: 'Gabriel Lopes Almeida', classificacao: 146 },
      { nome: 'Joao Gabriel Da Silva Dantas', classificacao: 147 },
      { nome: 'Joao Paulo Pereira Montessi', classificacao: 148 },
      { nome: 'Luiz Eduardo Da Paz Vitor', classificacao: 149 },
      { nome: 'Kamaykel Santos De Oliveira', classificacao: 150 },
    { nome: 'Jaime Gomes De Souza', classificacao: 151 },
    { nome: 'Adriano Hilario Talarico Soletti', classificacao: 152 },
    { nome: 'William Geovani Pinesso', classificacao: 153 },
    { nome: 'Maraisa Mendes', classificacao: 154 },
    { nome: 'Luiz Henrique Martins Medeiros', classificacao: 155 },
    { nome: 'Patricia De Kassia Vasconcelos', classificacao: 156 },
    { nome: 'Ana Carolina Vituriano Souza', classificacao: 157 },
    { nome: 'Lucas Ribeiro Pires', classificacao: 158 },
    { nome: 'Lucas Da Silva Machado', classificacao: 159 },
    { nome: 'Diogenes Mauricio Machado', classificacao: 160 },
    { nome: 'Marcus Vinicius Neves Caetano', classificacao: 161 },
    { nome: 'Rodrigo Duarte Bono Belascusa', classificacao: 162 },
    { nome: 'Eurico Renan Martins Dos Santos', classificacao: 163 },
    { nome: 'Eliseo Brites De Moraes Neto', classificacao: 164 },
    { nome: 'Renata Camila Da Costa Silva', classificacao: 165 },
    { nome: 'Gabrielly Aparecida Marques Ribeiro', classificacao: 166 },
    { nome: 'Laís Michels Fonseca', classificacao: 167 },
    { nome: 'Eder Benites Petzold', classificacao: 168 },
    { nome: 'Bruno Henrique Simões', classificacao: 169 },
    { nome: 'Eberle Taysson Pereira Maciel', classificacao: 170 },
    { nome: 'Arthur Victor Leon Caiubi Souza Silva', classificacao: 171 },
    { nome: 'Vanessa Mendes Da Silva De Oliveira (Sub judice)', classificacao: 172 },
    { nome: 'Moacir Felipe Araujo Lescano', classificacao: 173 },
    { nome: 'Larissa Iara Alem de Oliveira', classificacao: 174 },
    { nome: 'Giovana Viêro Peccini', classificacao: 175 },
    { nome: 'Juliany Brito De Araujo', classificacao: 176 },
    { nome: 'Bianca Cassupa Pereira', classificacao: 177 },
    { nome: 'Jean Carlos Vilela De Melo', classificacao: 178 },
    { nome: 'Carla Priscila Ferreira Miranda', classificacao: 179 },
    { nome: 'Lucas Souza Gimenes', classificacao: 180 },
    { nome: 'Thiago Germano De Figueiredo', classificacao: 181 },
    { nome: 'Danielle Aguena Martos Costa', classificacao: 182 },
    { nome: 'Isaias Simoel Gimenez Miotti', classificacao: 183 },
    { nome: 'Fernando Borges Zwicker', classificacao: 184 },
    { nome: 'Jamielle Fernanda Duarte De Amorim', classificacao: 185 },
    { nome: 'Neemias De Souza Jeremias', classificacao: 186 },
    { nome: 'Vitor Hugo Da Silva Santos', classificacao: 187 },
    { nome: 'Rick Kendy Iwashiro', classificacao: 188 },
    { nome: 'Alisson Monteiro Calazans', classificacao: 189 },
    { nome: 'Fernanda Isfran Da Silva', classificacao: 190 },
    { nome: 'Michael Francisco Da Silva (Sub judice)', classificacao: 191 },
    { nome: 'Mattheus Cardenas Souza', classificacao: 192 },
    { nome: 'Giovani Teixeira Da Silva (Sub judice)', classificacao: 193 },
    { nome: 'Gustavo Rodrigues Lemes', classificacao: 194 },
    { nome: 'Nathalia Welika Dos Santos Araujo', classificacao: 195 },
    { nome: 'Luís Flávio Isaías Lopes', classificacao: 196 },
    { nome: 'Magno Leoncio Sanches Saraiva', classificacao: 197 },
    { nome: 'Lucas Matos Do Nascimento', classificacao: 198 },
    { nome: 'Janaína Da Silva Carvalho Santos', classificacao: 199 },
    { nome: 'Mauricio Matheus De França Araujo', classificacao: 200 },
    { nome: 'Isaque Meleschco Arguelho', classificacao: 201 },
    { nome: 'Junior Cesar Rodrigues Colombo', classificacao: 202 },
    { nome: 'Maíra De Brito Rodrigues Alves', classificacao: 203 },
    { nome: 'Rafael Vasques Ribeiro', classificacao: 204 },
    { nome: 'Thalia Da Silva Bezerra', classificacao: 205 },
    { nome: 'Gustavo Ribeiro Dos Santos', classificacao: 206 },
    { nome: 'Thor Brum De Oliveira', classificacao: 207 },
    { nome: 'Felipe David De Oliveira', classificacao: 208 },
    { nome: 'Marcos Da Silva Rezende', classificacao: 209 },
    { nome: 'Stefan Wolff', classificacao: 210 },
    { nome: 'César Francisco Quirino', classificacao: 211 },
    { nome: 'Gabrielle Angel Leiko Rezende Nakashima', classificacao: 212 },
    { nome: 'Renan Matheus Oliveira Do Nascimento', classificacao: 213 },
    { nome: 'Bruno Noé Eger Sampaio', classificacao: 214 },
    { nome: 'Raquel Aparecida Lima Silva', classificacao: 215 },
    { nome: 'Francisco Rondon Neto', classificacao: 216 },
    { nome: 'Rafael Henrique Nogueira Roncada', classificacao: 217 },
    { nome: 'Henrique Barbosa Coelho', classificacao: 218 },
    { nome: 'Lucas Farias Alves', classificacao: 219 },
    { nome: 'Taina Da Silva', classificacao: 220 },
    { nome: 'Elaine Maria Ramos Dos Santos', classificacao: 221 },
    { nome: 'José Davi Da Silva De Oliveira', classificacao: 222 },
    { nome: 'Rafael Lemos', classificacao: 223 },
    { nome: 'Ana Julia Muniz Lemes', classificacao: 224 },
    { nome: 'Laércio Antonio De Sena Júnior', classificacao: 225 },
    { nome: 'Wesley Pereira Dos Santos', classificacao: 226 },
    { nome: 'Nikolas Rezende Obregão Nogueira', classificacao: 227 },
    { nome: 'Moises Sousa Santiago', classificacao: 228 },
    { nome: 'Fábio Cabral De Moraes', classificacao: 229 },
    { nome: 'Tiago Tadeu Mendes Nepomuceno Salles', classificacao: 230 },
    { nome: 'Rogerio Mendes Da Silva', classificacao: 231 },
    { nome: 'Hercules Miranda Da Silva', classificacao: 232 },
    { nome: 'Arthur Natan Santos Silva', classificacao: 233 },
    { nome: 'Matheus Da Cruz Alves', classificacao: 234 },
    { nome: 'Luana Cristina Avelino', classificacao: 235 },
    { nome: 'Geovane Da Rocha Silva', classificacao: 236 },
    { nome: 'Álysson Igor Rodrigues Leite', classificacao: 237 },
    { nome: 'Quezia Jaime De Jesus', classificacao: 238 },
    { nome: 'Danilo Barbosa Lima De Santana', classificacao: 239 },
    { nome: 'Cleiton Rodrigues De Oliveira', classificacao: 240 },
    { nome: 'João Vitor De Araújo Cunha', classificacao: 241 },
    { nome: 'Joao Marcos Vilela Lopes', classificacao: 242 },
    { nome: 'Andressa Patricia Soares De Castro', classificacao: 243 },
    { nome: 'Rafael Theodoro Serpa', classificacao: 244 },
    { nome: 'Alberto José Paim De Lima Filho', classificacao: 245 },
    { nome: 'Elis Fernanda Da Silva Oliveira', classificacao: 246 },
    { nome: 'Aline Stefani Lima Ostemberg', classificacao: 247 },
    { nome: 'Amanda Dourado Espindola', classificacao: 248 },
    { nome: 'Paulo André Argerin Rossatto', classificacao: 249 },
    { nome: 'Bárbara Ribeiro Remonti', classificacao: 250 },
    { nome: 'Gabriel Matheus Gouveia De Lima', classificacao: 251 },
    { nome: 'Evania Custódio Lopes', classificacao: 252 },
    { nome: 'Tainá Marques Taborga Sandim', classificacao: 253 },
    { nome: 'Paloma Grazielli Gomes Dos Anjos', classificacao: 254 },
    { nome: 'Brian Girotto', classificacao: 255 },
    { nome: 'Daniel Chaves Martins', classificacao: 256 },
    { nome: 'Gleici Ferreira Furman', classificacao: 257 },
    { nome: 'Izamara Casadia', classificacao: 258 },
    { nome: 'Douglas Sousa Tosta', classificacao: 259 },
    { nome: 'Vinicius Eduardo De Almeida Santos', classificacao: 260 },
    { nome: 'Fúlvio Souza De Souza', classificacao: 261 },
    { nome: 'Patrick Emerson Da Costa', classificacao: 262 },
    { nome: 'Alana De Sousa Oliveira Gamarra', classificacao: 263 },
    { nome: 'Carla Rebecca Barreto De Aguiar Esteves', classificacao: 264 },
    { nome: 'Lucio Vinicius Santos De Souza', classificacao: 265 },
    { nome: 'Herick Pereira Magalhaes', classificacao: 266 },
    { nome: 'Edilene Da Silva Maldonado', classificacao: 267 },
    { nome: 'Douglas Brito De Oliveira', classificacao: 268 },
    { nome: 'Bruno Jesus Dourado', classificacao: 269 },
    { nome: 'Kawam Gabriel Rodrigues Campos', classificacao: 270 },
    { nome: 'Daniely Silva De Albuquerque', classificacao: 271 },
    { nome: 'Thiago Vinicius Fonseca De Oliveira', classificacao: 272 },
    { nome: 'Angélica Freire Bettencourt', classificacao: 273 },
    { nome: 'Leandro Carvalho De Souza', classificacao: 274 },
    { nome: 'Augusto De Almeida Damasceno', classificacao: 275 },
    { nome: 'Jefferson Canabarra Peixoto', classificacao: 276 },
    { nome: 'Renato Ossuna Da Silva', classificacao: 277 },
    { nome: 'Luciano Junior Torale Gonçalves', classificacao: 278 },
    { nome: 'Lucas Henrique De Sena Marques', classificacao: 279 },
    { nome: 'Flavio Alves Ribeiro', classificacao: 280 },
    { nome: 'Jaiane Dayci Silva', classificacao: 281 },
    { nome: 'Willian De Oliveira Papa', classificacao: 282 },
    { nome: 'Gabriel De Oliveira Antunes', classificacao: 283 },
    { nome: 'Wesley Souza Almeida', classificacao: 284 },
    { nome: 'Gabriela Caroline De Souza', classificacao: 285 },
    { nome: 'Liene Cristina De Oliveira Rodrigues Moreira', classificacao: 286 },
    { nome: 'Nathaly Gonçalves Leite Lima', classificacao: 287 },
    { nome: 'Renan Pereira Coimbra', classificacao: 288 },
    { nome: 'Reginaldo Muller Pinto Gerolin', classificacao: 289 },
    { nome: 'Damiao Caboclo Da Silva', classificacao: 290 },
    { nome: 'Neyenne Caldeira Rocha Lopes', classificacao: 291 },
    { nome: 'Marcos Henrique Da Cunha Franco', classificacao: 292 },
    { nome: 'Leonardo Santos Correia', classificacao: 293 },
    { nome: 'Celino Magalhães Filho', classificacao: 294 },
    { nome: 'Mozane Evelin Vilela Teodoro', classificacao: 295 },
    { nome: 'Wellinton Menezes Grance', classificacao: 296 },
    { nome: 'Arthur Rodrigues De Mendonca', classificacao: 297 },
    { nome: 'Alessandro Gonçalves Da Silva', classificacao: 298 },
    { nome: 'Thiago Wotekoski Iglesias', classificacao: 299 },
    { nome: 'Fábio Andrade Dos Santos Silva', classificacao: 300 },
    { nome: 'Marcelo Henrique Nogueira Dos Santos', classificacao: 301 },
    { nome: 'Karthylith Rodrigues Vianna', classificacao: 302 },
    { nome: 'Jeovana Lima Gavilan', classificacao: 303 },
    { nome: 'Munir Sami Campitelli Ibrahim', classificacao: 304 },
    { nome: 'Gabriel Rodrigues De Oliveira', classificacao: 305 },
    { nome: 'Lady Maria Canhete Contrera', classificacao: 306 },
    { nome: 'Alice Dos Santos Saab', classificacao: 307 },
    { nome: 'Edlene De Souza Haveroth', classificacao: 308 },
    { nome: 'Marlon Gabriel De Souza Silva', classificacao: 309 },
    { nome: 'Larissa Cruz Lopes', classificacao: 310 },
    { nome: 'Diego Benedito Da Silva Moreira', classificacao: 311 },
    { nome: 'Tamires Raquel Aguirre Arevalo', classificacao: 312 },
    { nome: 'Luana Maria Sandim Santos', classificacao: 313 },
    { nome: 'Alex Lima De Souza', classificacao: 314 },
    { nome: "Murilo De Souza Rodrigues", classificacao: 315 },
  { nome: "Lincon Eder Ribeiro Valverde", classificacao: 316 },
  { nome: "Luiz Henrique Costa De Oliveira", classificacao: 317 },
  { nome: "Andrey Jeverson Pereira Da Silva Morais", classificacao: 318 },
  { nome: "Andressa Sousa Santos Coqueiro", classificacao: 319 },
  { nome: "Joshuan Sousa Valdez", classificacao: 320 },
  { nome: "Vinicius De Araujo Marques", classificacao: 321 },
  { nome: "Fernando Pereira Sales", classificacao: 322 },
  { nome: "Jessika Ribeiro Mimoso", classificacao: 323 },
  { nome: "Ana Carolina Ormond De Souza Carvalho", classificacao: 324 },
  { nome: "Murilo Henrique Bezerra Araújo", classificacao: 325 },
  { nome: "Lucas Xavier De Souza Oba (Sub Judice)", classificacao: 326 },
  { nome: "Daniel Guttemberg Ferreira De Brito", classificacao: 327 },
  { nome: "Andressa Da Silva Lovera", classificacao: 328 },
  { nome: "Joao Pedro Machado Neres", classificacao: 329 },
  { nome: "Bruna Pereira Schumann", classificacao: 330 },
  { nome: "Maycon Fernando Da Gloria Toledo", classificacao: 331 },
  { nome: "Luiz Fernando Milagres Alves", classificacao: 332 },
  { nome: "David Rodrigues Ribeiro", classificacao: 333 },
  { nome: "Luana Schubert", classificacao: 334 },
  { nome: "Rafael Peres Ramiro", classificacao: 335 },
  { nome: "Alan Da Silva Casal Batista", classificacao: 336 },
  { nome: "Ludson De Lima Vargas", classificacao: 337 },
  { nome: "Thiago Ramos De Lima", classificacao: 338 },
  { nome: "João Pedro Dim Bergi", classificacao: 339 },
  { nome: "Djalma Henrique Rezende Veiga", classificacao: 340 },
  { nome: "Rafaela Vieira Neiva", classificacao: 341 },
  { nome: "Gisele Marques Da Silva", classificacao: 342 },
  { nome: "Leonardo Felipe De Almeida", classificacao: 343 },
  { nome: "Vinnicius Silva Borges", classificacao: 344 },
  { nome: "Willia Lino Souza", classificacao: 345 },
  { nome: "Gelson Firmo", classificacao: 346 },
  { nome: "Abimael Correia Marques", classificacao: 347 },
  { nome: "Paulo Ricardo Da Silva De Freitas", classificacao: 348 },
  { nome: "Marcelo Pimenta Da Silva", classificacao: 349 },
  { nome: "Vinicius Rovari De Cristo", classificacao: 350 },
  { nome: "Murilo Henrique Medeiros Rosa", classificacao: 351 },
  { nome: "Jéssyca Ellen Weissinger", classificacao: 352 },
  { nome: "Henrique Bispo Vaz", classificacao: 353 },
  { nome: "Pablo Giovane De Oliveira De Souza Maldonado", classificacao: 354 },
  { nome: "Jessica Hillary Melo Sobrinho", classificacao: 355 },
  { nome: "Laura Félix Barbosa", classificacao: 356 },
  { nome: "Jéferson Salla", classificacao: 357 },
  { nome: "Ulpiano Jacquet Filho", classificacao: 358 },
  { nome: "Rânily Ribeiro Graça", classificacao: 359 },
  { nome: "Camila De Souza Gonçalves", classificacao: 360 },
  { nome: "Felipe Martins De Souza Costa", classificacao: 361 },
  { nome: "Jean Luca Dos Reis Bobadilha", classificacao: 362 },
  { nome: "Sidnei Gonçalves Ortega", classificacao: 363 },
  { nome: "Mateus Penha Ribeiro Da Silveira", classificacao: 364 },
  { nome: "Mauro Vieira Da Costa", classificacao: 365 },
  { nome: "Talicia Camila Bezerra Carvalho", classificacao: 366 },
  { nome: "Débora De Souza Ferreira", classificacao: 367 },
  { nome: "Brenda Ferreira Caríssimo Picorelli", classificacao: 368 },
  { nome: "Ingrit Amarante Sabino De Oliveira", classificacao: 369 },
  { nome: "João Gabriel Mendes Chaves", classificacao: 370 },
  { nome: "Bruno Ferreira Peres", classificacao: 371 },
  { nome: "Jônatas Triunfo Da Silva Nascimento", classificacao: 372 },
  { nome: "Vitor Nantes Lemos", classificacao: 373 },
  { nome: "Felipe Barros Garcia", classificacao: 374 },
  { nome: "Alisson Vinicius Da Silva Lima", classificacao: 375 },
  { nome: "Vinícius Moraes Menezes", classificacao: 376 },
  { nome: "Israel Pinto Da Silva Filho", classificacao: 377 },
  { nome: "Gustavo Metello", classificacao: 378 },
  { nome: "Evellyn Martinez Maia", classificacao: 379 },
  { nome: "Bruno Pereira Carvalho Barbosa", classificacao: 380 },
  { nome: "Alécio Andrade Leite", classificacao: 381 },
  { nome: "Bruna Larissa Gonçalves Pires", classificacao: 382 },
  { nome: "Felipe Rezende De Oliveira Lima", classificacao: 383 },
  { nome: "Nathalia Gonçalves Da Silveira", classificacao: 384 },
  { nome: "Gustavo Henrique Medeiros De Oliveira", classificacao: 385 },
  { nome: "Misael Lima De Mesquita Júnior", classificacao: 386 },
  { nome: "Daniel Kerestesi Freire", classificacao: 387 },
  { nome: "Laercio Cassel Dos Santos", classificacao: 388 },
  { nome: "Diego Henrique Da Silva Carvalho", classificacao: 389 },
  { nome: "Andressa Batista Espirito Santo", classificacao: 390 },
  { nome: "Rivelton Silva De Moraes", classificacao: 391 },
  { nome: "Caique Gomes De Oliveira", classificacao: 392 },
  { nome: "Nathalia Yasmine Tolentino Vilela", classificacao: 393 },
  { nome: "Nayanne Rodrigues Gervasio", classificacao: 394 },
  { nome: "Ana Júlia Barbosa Aguilera", classificacao: 395 },
  { nome: "Caio Lucas Oliveira Andrade", classificacao: 396 },
  { nome: "Andressa Porto De Oliveira", classificacao: 397 },
  { nome: "Mateus David Dutra Pereira", classificacao: 398 },
  { nome: "Cristiane Matos Da Silva", classificacao: 399 },
  { nome: "Lucas Mendonça Vargas", classificacao: 400 },
  { nome: "Wuilker Rafael Da Silva Garcia", classificacao: 401 },
  { nome: "Carlos Eduardo Dos Santos Dias", classificacao: 402 },
  { nome: "Leonardo Bruno Fernandes Moreira", classificacao: 403 },
  { nome: "Inara Freitas Do Nascimento", classificacao: 404 },
  { nome: "Kenia Rocha Tavares", classificacao: 405 },
  { nome: "Ivan Tobias De Oliveira", classificacao: 406 },
  { nome: "Eduardo Silveira Damaceno", classificacao: 407 },
  { nome: "Paulo Cesar De Souza Novaes", classificacao: 408 },
  { nome: "Wesley Joao Rodrigues", classificacao: 409 },
  { nome: "Tércio Arévalo De Aquino", classificacao: 410 },
  { nome: "Alan Nunes De Souza", classificacao: 411 },
  { nome: "Luiz Eduardo De Jesus Guedes", classificacao: 412 },
  { nome: "Antonio Luan De Lima", classificacao: 413 },
  { nome: "Leandro Dias Catellan Teixeira", classificacao: 414 },
  { nome: "Vinicius Henrique Gonçalves Portilho", classificacao: 415 },
  { nome: "Lucas Vinícius Almiron Dos Santos", classificacao: 416 },
  { nome: "Wender Pereira", classificacao: 417 },
  { nome: "Higor Rodrigues Oliveira", classificacao: 418 },
  { nome: "Vinicius Correa Bianco", classificacao: 419 },
  { nome: "Thais Ferreira Mendes", classificacao: 420 },
  { nome: "Iara Aparecida Ribeiro", classificacao: 421 },
  { nome: "Karoline Melo De Oliveira Pi Ferrario", classificacao: 422 },
  { nome: "Fernando Henrique Assis De Andrade", classificacao: 423 },
  { nome: "Leticia Dantas Da Silva (Sub judice)", classificacao: 424 },
    { nome: "Rafael Ferreira Segundo", classificacao: 425 },
    { nome: "Daniel Macedo Matos Da Silva", classificacao: 426 },
    { nome: "Gustavo Henrique Dos Santos Noetzold", classificacao: 427 },
    { nome: "Gabriel Felix Cabral", classificacao: 428 },
    { nome: "Milene Silva Lima Bomfim", classificacao: 429 },
    { nome: "Ingrid Tuanne Do Carmo Dias", classificacao: 430 },
    { nome: "Caio Da Silva Laguna", classificacao: 431 },
    { nome: "Marcus Vinycius Lourenço Ferreira", classificacao: 432 },
    { nome: "Jéssica Ayumi Uehara Aguilera", classificacao: 433 },
    { nome: "Bruno Henrique Da Silva Martins", classificacao: 434 },
    { nome: "Renan Wilson Varanis Da Silva", classificacao: 435 },
    { nome: "Renato Stoco De Machado", classificacao: 436 },
    { nome: "Renato De Alencar Ricaldes", classificacao: 437 },
    { nome: "Luany Thaynara Louzan", classificacao: 438 },
    { nome: "Adailton Pireli Costa", classificacao: 439 },
    { nome: "Igor Cesar Severo Antunes", classificacao: 440 },
    { nome: "Lucas Lincoln De Oliveira Matsumoto", classificacao: 441 },
    { nome: "Bruna Camila Ajala Araldi", classificacao: 442 },
    { nome: "Vinicius Araujo Soares", classificacao: 443 },
    { nome: "Jean Marcos Franco De Souza", classificacao: 444 },
    { nome: "Vinicius Guimaraes De Carvalho", classificacao: 445 },
    { nome: "Wilian Oliveira De Freitas", classificacao: 446 },
    { nome: "Fernando Numeriano De Oliveira", classificacao: 447 },
    { nome: "Lucas Calixto Paz Bezerra", classificacao: 448 },
    { nome: "Kelly Cristina Cândido Dos Santos", classificacao: 449 },
    { nome: "Isabela De Oliveira Da Riva", classificacao: 450 },
    { nome: "Weverton Gabriel De Barros Marques", classificacao: 451 },
    { nome: "Wevertton Cristiano Anjos Dos Santos", classificacao: 452 },
    { nome: "Lucas Dias Pinheiro", classificacao: 453 },
    { nome: "Jailzon Da Silva Rodrigues", classificacao: 454 },
    { nome: "Marcel Junio Da Silva Souza", classificacao: 455 },
    { nome: "Mailson Francisco Da Silva", classificacao: 456 },
    { nome: "Marcos Augusto De Sousa", classificacao: 457 },
    { nome: "Kaio Lima Da Silva", classificacao: 458 },
    { nome: "Rubiany Vasconcelos Duarte", classificacao: 459 },
    { nome: "Alan Carlos Miranda De Oliveira Cruz", classificacao: 460 },
    { nome: "Ronaldo Menão Jesus", classificacao: 461 },
    { nome: "Julia Beatriz Paz Pedroso", classificacao: 462 },
    { nome: "Ulisses Guimarães Sanches", classificacao: 463 },
    { nome: "Geraldo Claudio Pereira", classificacao: 464 },
    { nome: "Cleber Da Silva Ramirez", classificacao: 465 },
    { nome: "Mariana Pereira De Almeida", classificacao: 466 },
    { nome: "Pedro Paulo Machado Rodrigues", classificacao: 467 },
    { nome: "Joice Cristina Moreno Fernandes", classificacao: 468 },
    { nome: "João Victor Fagundes Silva", classificacao: 469 },
    { nome: "Nicole Bezerra Vaz", classificacao: 470 },
    { nome: "Beatriz Da Silva Pimenta", classificacao: 471 },
    { nome: "Ranon Louran Do Espirito Santo Costa", classificacao: 472 },
    { nome: "Mayse Rice Silveira Cardoso", classificacao: 473 },
    { nome: "Osvaldo Gonzalez", classificacao: 474 },
    { nome: "Mira Celi Nazare Dias Basilio", classificacao: 475 },
    { nome: "Steffano Mingotti Dias", classificacao: 476 },
    { nome: "Vitor Da Silva Lima", classificacao: 477 },
    { nome: "Murilo De Lima Silva", classificacao: 478 },
    { nome: "Raphaela Heloína Schiemann", classificacao: 479 },
    { nome: "Felipe Wellington De Oliveira Sousa", classificacao: 480 },
    { nome: "Marinara Alexandre Da Silva", classificacao: 481 },
    { nome: "Tiago Wisenfad Lopes", classificacao: 482 },
    { nome: "André Luiz Pereira Leite Junior", classificacao: 483 },
    { nome: "Edinei Machado De Almeida", classificacao: 484 },
    { nome: "Paulo Henrique Ferreira Do Nascimento", classificacao: 485 },
    { nome: "Aldair Canuto Do Nascimento", classificacao: 486 },
    { nome: "Fabrício Palmeira Rios Santos", classificacao: 487 },
    { nome: "Adna Da Silva Rabello", classificacao: 488 },
    { nome: "Léo De Medeiros Guimarães Neto", classificacao: 489 },
    { nome: "Ana Carolina Mugarte Potrich", classificacao: 490 },
    { nome: "Beatriz Carvalho Sottolano", classificacao: 491 },
    { nome: "Lucas Bryan Alencar De Oliveira", classificacao: 492 },
    { nome: "Rodrigo Da Rocha Rosati", classificacao: 493 },
    { nome: "Martinho Eduardo Pereira Filho", classificacao: 494 },
    { nome: "Juliana De Rezende De Souza", classificacao: 495 },
    { nome: "Jose Robson Sanabria Trindade", classificacao: 496 },
    { nome: "Rayani Barros Freitas", classificacao: 497 },
    { nome: "Daniela Oliveira De Souza", classificacao: 498 },
    { nome: "Flávio Luis Villalba Urquiza Junior", classificacao: 499 },
    { nome: "Gladison Bezerra Vieira", classificacao: 500 },
    { nome: "Vinícius Argemon Pereira Benites", classificacao: 501 },
    { nome: "Luiz Henrique Alves De Oliveira", classificacao: 502 },
    { nome: "Mateus Pinheiro De Oliveira", classificacao: 503 },
    { nome: "Jéssica Ferreira Cescon", classificacao: 504 },
    { nome: "Danielle Dos Santos Souza", classificacao: 505 },
    { nome: "Augusto Gameiro", classificacao: 506 },
    { nome: "Thiago Fagundes Lemos", classificacao: 507 },
    { nome: "José Eduardo Duarte Da Silva", classificacao: 508 },
    { nome: "Icaro Almeida Lemos Alves", classificacao: 509 },
    { nome: "Lauro Dalaqua Junior", classificacao: 510 },
    { nome: "Fernando Jorge De Lima", classificacao: 511 },
    { nome: "Ana Paula Rezende Dos Santos", classificacao: 512 },
    { nome: "Sindi Sabrina Pedroso Cubilla", classificacao: 513 },
    { nome: "Gustavo Da Silva Aparecido", classificacao: 514 },
    { nome: "Samuel Lucas Diniz", classificacao: 515 },
    { nome: "Cleber Da Silva", classificacao: 516 },
    { nome: "Daniel Almada Messa", classificacao: 517 },
    { nome: "Danilo Eugênio Ferreira Moraes", classificacao: 518 },
    { nome: "Rafaely Carvalho Alves", classificacao: 519 },
    { nome: "Viviane Inez Satirito Silvestre", classificacao: 520 },
    { nome: "Gleidson Souza Carvalho", classificacao: 521 },
    { nome: "Raul Do Amaral Vieira", classificacao: 522 },
    { nome: "Gabriella Gazola De Melo", classificacao: 523 },
    { nome: "Junio Ferreira Da Silva", classificacao: 524 },
    { nome: "Carlos Pedro Meiato Da Silva", classificacao: 525 },
    { nome: "Alison Perira Braga", classificacao: 526 },
    { nome: "Leandro Barros Schencknecht", classificacao: 527 },
    { nome: "Bruna Ferreira Garbin", classificacao: 528 },
    { nome: "Gabriel Martins Duarte", classificacao: 529 },
    { nome: "Sanny Mara Dos Santos Lima", classificacao: 530 },
    { nome: "Larissa Dos Santos Costa", classificacao: 531 },
    { nome: "Anay Crystyna Freitas De Souza", classificacao: 532 },
    { nome: "Henrique De Souza Santos", classificacao: 533 },
    { nome: "Matheus Almeida De Moura Monteiro De Oliveira", classificacao: 534 },
    { nome: "Fernanda Antunes Rezende", classificacao: 535 },
    { nome: "Lucas Costa Soares", classificacao: 536 },
    { nome: "Emilly De Lima Moraes", classificacao: 537 },
    { nome: "Rafael Madeira De Oliveira", classificacao: 538 },
    { nome: "Érica Freitas Rojas Vieira", classificacao: 539 },
    { nome: "Natalia Ester Correa Ramalho", classificacao: 540 },
    { nome: "Vitor Augusto Souza De Carvalho", classificacao: 541 },
    { nome: "Sayuri Hirasaka", classificacao: 542 },
    { nome: "Lethicia Megaioli De Oliveira", classificacao: 543 },
    { nome: "Adeandrea Peixoto Moraes Santana", classificacao: 544 },
    { nome: "Willian Costa Dias", classificacao: 545 },
    { nome: "Alexandre Rosa Flores", classificacao: 546 },
    { nome: "Luiz Pegoraro Junior", classificacao: 547 },
    { nome: "Danilo Maciel De Lima", classificacao: 548 },
    { nome: "Thiago Da Silva Martins", classificacao: 549 },
    { nome: "Pâmela Fernandes Pereira", classificacao: 550 },
    { nome: "Junior Hoinoski Cordeiro", classificacao: 551 },
    { nome: "Diego Pereira Coelho", classificacao: 552 },
    { nome: "Luiz Henrique Silva Dos Santos", classificacao: 553 },
    { nome: "Raiane Da Silva", classificacao: 554 },
    { nome: "Bianca Marques Dos Santos", classificacao: 555 },
    { nome: "Haryson Lucas De Souza Jorge", classificacao: 556 },
    { nome: "Petronio Neres Da Silva", classificacao: 557 },
    { nome: "Luana Neves Da Silva", classificacao: 558 },
    { nome: "Munyr Luna Barion", classificacao: 559 },
    { nome: "Rodrigo Orro De Campos Viega", classificacao: 560 },
    { nome: "Jó Noélcio Anoar De Melo Ávila", classificacao: 561 },
    { nome: "Regiane Vitoria Perin Ortega", classificacao: 562 },
    { nome: "Bruno Gracini Macedo", classificacao: 563 },
    { nome: "Joilhan Kelvis De Assis Pires", classificacao: 564 },
    { nome: "Rafael Angelozi De Souza", classificacao: 565 },
    { nome: "Jean Carlos De Freitas Da Silva", classificacao: 566 },
    { nome: "Pedro Henrique Fuzario Custodio", classificacao: 567 },
    { nome: "Weslen Dos Santos Resende", classificacao: 568 },
    { nome: "Jeferson Rolon De Assis", classificacao: 569 },
    { nome: "Farney Mendes Fontoura", classificacao: 570 },
    { nome: "Matheus Andriu De Miranda Silva", classificacao: 571 },
    { nome: "Jéfiton De Souza Polidório", classificacao: 572 },
    { nome: "Matheus Henrique De Lima Vilela", classificacao: 573 },
    { nome: "Eziel Do Amaral Centurion", classificacao: 574 },
    { nome: "Abimael Vicente De Souza Machado", classificacao: 575 },
    { nome: "Wagner Alves Pereira", classificacao: 576 },
    { nome: "Paulliane Martins Souza", classificacao: 577 },
    { nome: "Jeferson Saucedo Amorim", classificacao: 578 },
    { nome: "Willian Villamayor Fernandes Da Silva", classificacao: 579 },
    { nome: "Diego Da Silva Souza", classificacao: 580 },
    { nome: "Lucas Vaz Nemezio Da Silva Silveira", classificacao: 581 },
    { nome: "Ana Paula Fortes", classificacao: 582 },
    { nome: "Pamela Ferraz De Albuquerque", classificacao: 583 },
    { nome: "Wenderson Da Silva Cavalcante", classificacao: 584 },
    { nome: "Thécia Lourenço Furtado", classificacao: 585 },
    { nome: "Alisson Araujo Ferreira", classificacao: 586 },
    { nome: "Gabriel Abrahão Gomes De Oliveira", classificacao: 587 },
    { nome: "Fuad Alessandro Gonçalves Da Rocha", classificacao: 588 },
    { nome: "Rodrigo Onofre Maurer Tavares", classificacao: 589 },
    { nome: "Rafael Torquato De Escobar", classificacao: 590 },
    { nome: "Amanda Da Silva Gomes", classificacao: 591 },
    { nome: "Fabricio Santos E Costa Salgado", classificacao: 592 },
    { nome: "Matheus Dos Santos Pitol", classificacao: 593 },
    { nome: "Leonardo Da Rosa Aivi", classificacao: 594 },
    { nome: "Giullian Batista Vialle", classificacao: 595 },
    { nome: "Lincoln Calistro Berro", classificacao: 596 },
    { nome: "Jose Gomes Pereira Neto", classificacao: 597 },
    { nome: "Natalia Evelin Alves Dos Reis", classificacao: 598 },
    { nome: "Isabella Fidelis", classificacao: 599 },
    { nome: "Carlos Eduardo Da Silva Filho", classificacao: 600 },
    { nome: "Matheus Ferreira Sonohata", classificacao: 601 },
    { nome: "Raphael Vilalva De Queiroz", classificacao: 602 },
    { nome: "Lucas Ovelar Leme", classificacao: 603 },
    { nome: "Eduardo Santana De Moura Sousa", classificacao: 604 },
    { nome: "Wellington Flores De Castro", classificacao: 605 },
    { nome: "Tiago Andre Da Silva Dias", classificacao: 606 },
    { nome: "Cássio Sales Cassimiro", classificacao: 607 },
    { nome: "Luciane Oliveira Portela Pissini", classificacao: 608 },
    { nome: "Gabriel Schmitt Schroeder", classificacao: 609 },
    { nome: "Luis Henrique Silva Leao", classificacao: 610 },
    { nome: "Daniel Nunes Guimarães", classificacao: 611 },
    { nome: "Julio Cesar Seccatto", classificacao: 612 },
    { nome: "Fernanda Mortari Végas", classificacao: 613 },
    { nome: "Deivid An Martins De Arruda", classificacao: 614 },
    { nome: "Marcos Eloy Giron", classificacao: 615 },
    { nome: "Thiago Aparecido Ramos Pertile", classificacao: 616 },
    { nome: "Laurielene Elen Arruda Silva Deodato", classificacao: 617 },
    { nome: "Heloísa Polacchine Leite", classificacao: 618 },
    { nome: "Bárbara Marinho Azevedo", classificacao: 619 },
    { nome: "Cristhian Freitas Batista", classificacao: 620 },
    { nome: "Julio Cesar Torres Junior", classificacao: 621 },
    { nome: "Raul Murilo Camacho Seba", classificacao: 622 },
    { nome: "Polyana Jessyca Felisardo Gonçalves Wruck", classificacao: 623 },
    { nome: "Carlos Henrique Cabanhas De Oliveira", classificacao: 624 },
    { nome: "Fani Elizabeth Ojeda", classificacao: 625 },
    { nome: "José Fernando Manzione Paes De Barros", classificacao: 626 },
    { nome: "Caio Alexandre Navarro Antonio", classificacao: 627 },
    { nome: "Mikael Dos Santos Ortiz", classificacao: 628 },
    { nome: "Carlos Eduardo Martins Silva", classificacao: 629 },
    { nome: "Gabriel Florenciano Ferreira", classificacao: 630 },
    { nome: "Adeilson Rodrigues Faria", classificacao: 631 },
    { nome: "Watson Lima Da Silva", classificacao: 632 },
    { nome: "Leonardo Paniago Teodoro Almeida", classificacao: 633 },
    { nome: "Luan Matheus Da Silva Amorim", classificacao: 634 },
    { nome: "José Euclides Da Silva Neto", classificacao: 635 },
    { nome: "Michele Kuchar Matte", classificacao: 636 },
    { nome: "Camila Santiago Da Silva", classificacao: 637 },
    { nome: "Wanderley Campos Pereira Junior", classificacao: 638 },
    { nome: "Rhaiana Borges Pereira", classificacao: 639 },
    { nome: "Hayana Fardim da Gama", classificacao: 640 },
    { nome: "Pamela Aparecida Azevedo De Paula", classificacao: 641 },
    { nome: "Huender Lucas Farias De Sousa", classificacao: 642 },
    { nome: "Lucas Barros Garcia", classificacao: 643 },
    { nome: "Luiz Felippe Antunes Ribeiro", classificacao: 644 },
    { nome: "Natália Godoi De Oliveira Fagundes", classificacao: 645 },
    { nome: "Michael Carmona De Almeida", classificacao: 646 },
    { nome: "Daniel Paredes De França", classificacao: 647 },
    { nome: "Millena Christine Dezan Da Fonseca", classificacao: 648 },
    { nome: "Leandro Hideyuki Mori", classificacao: 649 },
    { nome: "Wanderson Bach Queiroz", classificacao: 650 },
    { nome: "Renan Mamedes Delmão De Sena", classificacao: 651 },
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

  // Nome a partir do qual começar a atualização
const nomeInicio = "OSVALDO GONZALEZ";

    async function atualizarClassificacao() {
      try {
        // Obtém todos os candidatos do Firestore
        const snapshot = await getDocs(collection(db, 'users'));
        const candidatos = snapshot.docs.map(doc => ({
          id: doc.id,
          nome: doc.data().nome
        }));
    
        // Encontra a posição de início na lista nomesCandidatos
        const indiceInicio = nomesCandidatos.indexOf(nomeInicio);
        if (indiceInicio === -1) {
          throw new Error(`Nome "${nomeInicio}" não encontrado na lista de candidatos.`);
        }
    
        // Cria um mapa de nomes para a classificação com base na lista nomesCandidatos
        const mapaClassificacao = nomesCandidatos.slice(indiceInicio).reduce((acc, nome, index) => {
          acc[nome] = index + 1 + indiceInicio; // A classificação começa no índice + 1
          return acc;
        }, {});
    
        // Atualiza a classificação dos candidatos no Firestore
        for (const candidato of candidatos) {
          const novaClassificacao = mapaClassificacao[candidato.nome];
    
          if (novaClassificacao) {
            const docRef = doc(db, 'users', candidato.id);
            await updateDoc(docRef, {
              classificacao: novaClassificacao
            });
            console.log(`Classificação atualizada para o candidato ${candidato.nome} com ID ${candidato.id}.`);
          }
        }
    
        toast.success('Classificações atualizadas com sucesso!', { className: 'toast-success' });
      } catch (error) {
        console.error('Erro ao atualizar a classificação:', error);
        toast.error('Erro ao atualizar a classificação.', { className: 'toast-error' });
      }
    }
      
    



    async function verificarEAtualizarClassificacaoCandidatos() {
      try {
        const snapshot = await getDocs(collection(db, 'users'));
        const usuarios = snapshot.docs;
    
        for (const usuario of usuarios) {
          const data = usuario.data();
          const nomeBanco = data.nome.toUpperCase(); // Nome no banco de dados em letras maiúsculas
          const classificacaoBanco = data.classificacao;
    
          // Encontra o candidato na lista com base no nome
          const candidato = nomeCandidatosClassificacao.find(
            (candidato) => candidato.nome.toUpperCase() === nomeBanco
          );
    
          if (candidato) {
            if (candidato.classificacao !== classificacaoBanco) {
              console.log(`Candidato ${nomeBanco} tem classificação incorreta (${classificacaoBanco}). Atualizando para ${candidato.classificacao}.`);
    
              // Atualiza a classificação no banco de dados
              const docRef = doc(db, 'users', usuario.id);
              await updateDoc(docRef, {
                classificacao: candidato.classificacao
              });
    
              console.log(`Classificação do candidato ${nomeBanco} atualizada para ${candidato.classificacao}.`);
            } else {
              console.log(`Candidato ${nomeBanco} já está com a classificação correta.`);
            }
          } else {
            console.log(`Candidato ${nomeBanco} não encontrado na lista.`);
          }
        }
      } catch (error) {
        console.error('Erro ao verificar e atualizar classificação dos candidatos:', error);
      }
    }

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


        // verificarEAtualizarClassificacaoCandidatos();


        navigate("/home");
      } catch (error) {
        console.log(error);
        toast.error("Ops, algo deu errado!");
      } finally {
        setLoadingAuth(false);
      }
    }
    

    async function signUp(email, password, name, classificacao, cidadeprimeira, cidadesegunda) {
      setLoadingAuth(true);
    
      // Remove apenas o último espaço no final do nome, se houver
      const trimmedName = name.endsWith(' ') ? name.slice(0, -1) : name;
    
      // Verifica se o nome está na lista de candidatos
      if (!nomesCandidatos.includes(trimmedName)) {
        toast.error(`Nome "${trimmedName}" não está na lista de candidatos!`, { className: 'toast-error' });
        setLoadingAuth(false);
        return; // Interrompe o processo de cadastro
      }
    
      try {
        // Verifica se o nome já está no banco de dados
        const userSnapshot = await getDocs(query(collection(db, "users"), where("nome", "==", trimmedName)));
        if (!userSnapshot.empty) {
          toast.error(`Nome "${trimmedName}" já está cadastrado!`, { className: 'toast-error' });
          setLoadingAuth(false);
          return; // Interrompe o processo de cadastro
        }
    
        const value = await createUserWithEmailAndPassword(auth, email, password);
        const uid = value.user.uid;
    
        await setDoc(doc(db, "users", uid), {
          nome: trimmedName,
          classificacao: classificacao,
          cidadeprimeira: cidadeprimeira,
          cidadesegunda: cidadesegunda,
          avatarUrl: null
        });
    
        let data = {
          uid: uid,
          nome: trimmedName,
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