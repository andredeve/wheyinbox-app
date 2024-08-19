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
      "Edson Augusto Alves Da Silva",
      "Fernando Agues De Oliveira",
      "Gleiciane Santos Costa",
      "Pedro Elias Da Silveira",
      "Henrique Lima Dos Santos",
      "Lucas Matheus Barbosa Deoliveira",
      "João Victor Francisquett Dos Santos",
      "Mauri Kehl Junior",
      "Vinicius Moretti De Paula",
      "Reuhel Da Silva Cavalcante",
      "William Marcari Ribeiro Barros",
      "Julio Cesar Silva Rodrigues",
      "Larissa Aryane Galvão",
      "Thayloane Souza Da Silva Luz",
      "Luciene Sales Dos Santos",
      "Paulo Sérgio Akieda",
      "Fernanda Cardoso Wolf",
      "Renato Arthur Fabro Dos Santos",
      "Bruna Quezini Da Silva",
      "Alexsandra Carolina Guimarães De Oliveira",
      "Meiri Anita Nichetti Haach",
      "André Luiz Ferreira Da Silva",
      "Ronaldo Lopes Maciel",
      "Juliana Romeiro Salina",
      "Willian Dias Da Silva Junior",
      "Thiago Alberto Valle Do Nascimento",
      "Murilo Brendo Dias Lins",
      "Edmilson Camargo Da Silva",
      "Mariana Maria Rodrigues Zito",
      "Gustavo Cesar Domingues De Oliveira",
      "André De Lima Benteo",
      "Gabriela Ribeiro Mendonça Maldonado",
      "Lyncon Marques",
      "Rodrigo Alves Barros",
      "Vitoria Caroline Barboza Fernandes De Souza",
      "Elliot Jacques Lima",
      "Pedro Henrique Figueiredo Barbosa",
      "Edson Eduardo Fernandes Amarilha",
      "Wesley Mendonça De Brito Silva",
      "Carlos Henrique Alves Rodrigues",
      "José Gomes De Andrade Neto",
      "Osmar Vasques Gonzalez",
      "Cassiano Lucas Simplicio Batistote",
      "Larissa Arguilera De Paula (Sub judice)",
      "Ludiér Mariano Rosa",
      "Bruno Maciel Garcia",
      "Viviane Cassemiro De Almeida Canepa",
      "Vítor Da Rocha Dias Duarte",
      "Camila Da Silva Calixto Aguirre",
      "Pedro Gabriel Teles Barbosa",
      "Wesley Alves Costa",
      "Claudieli Tanara Wottrich Timm",
      "Igor De Oliveira Salina (Sub judice)",
      "Lucas Figale Cardoso",
      "Arthur Araujo Do Nascimento",
      "Monique Ortiz Santana",
      "Luis Fernando Pereira Pinto",
      "Aline Gomes Gonçalves",
      "Melany Estevao Barbosa Soares (Sub judice)",
      "Lucas De Oliveira Diniz",
      "Clovis De Souza Rocha",
      "Giovanny Souza Da Fonseca",
      "Ricardo Junior Alves Kurovski",
      "Alexandre Bernardes Gomes Da Silva",
      "Leandro Dos Santos Pereira",
      "Denner Douglas Medeiros Soares",
      "Edson Maximo Romero Junior",
      "Luiz Fernando Nunes",
      "Valleria Orso Valmini Siqueira",
      "Thaisson Oliveira Da Silva",
      "Johnne Alex Batista Gomes",
      "Nícolas Nogueira Duailibi",
      "Nicole Roda Rodrigues",
      "Douglas Soares Regini",
      "Lucas Anthony Alves Barros",
      "Fernanda Silva Marques",
      "Elivander Sanches Honorato",
      "Rewller Vianna Da Silva",
      "Bruno Vinicius Da Silva Abreu",
      "Anderson Barroso De Almeida",
      "Samuel De Souza Queiroz",
      "Daniella Ferreira Leite",
      "Raissa Maria Alves Vida",
      "Bruno Antonio Dos Reis",
      "Dalvan Bruno Ferreira Da Silva",
      "Maria Eduarda Avelino Prates",
      "Graciely Ferreira Rodrigues",
      "Cristina Schultz Kuhn",
      "Lorena Pereira De Souza",
      "Emerson Rodrigo Pereira Dos Santos",
      "Izabelle Souza Delaterra De Assis",
      "Ygor Garcia De Oliveira",
      "Albert Natan De Oliveira Medeiros",
      "Wesley Vinicius Bordas De Figueiredo",
      "Cleyton Cassiano Ribeiro Rodrigues",
      "Matheus Hemerson Nogueira Rodrigues",
      "Fernanda Caroline Batistoti Simas",
      "Eber De Morais Marinhas",
      "Larissa Fernandes De Souza",
      "Lucas Vinícius Conche De Souza",
      "Karolyne Freitas Nascimento",
      "Maria Estela Da Silva Casanova (Sub judice)",
      "Gabriele Bezerra Porto",
      "Brenda Rodrigues Ramires Ferreira",
      "Isabella Catarina Rodrigues Jacob",
      "Aline Szaubram",
      "Luiz Felipe Minussi Da Silva",
      "Adilson Antunes Martins",
      "Brendo De Jesus Da Silva",
      "Luciana Tinoco Machado",
      "Sergio Willimann De Souza",
      "Michele Petronilo Inzabral",
      "Marcelos Simão Basílio Sobrinho",
      "Lauana Elisa Ramalho De Souza",
      "Caio Boaventura Da Silva",
      "João Victor Guedes De Lima",
      "Herick Matheus De Souza Exteca",
      "Carla Caroline Pinto De Arruda",
      "Daniel De Jesus Araújo",
      "Fernanda Castelo Girard",
      "Lucas Nogueira Tote",
      "Stephanny Karoline Borges Sonchini",
      "Debora Brites Ribeiro De Brites",
      "Fagner Charles Ramos",
      "Siéslem Menezes Sanche Pérez",
      "Breno Rezende Rodrigues",
      "João Matheus Navarro Dos Santos",
      "Raquel Duarte Felipetto",
      "Éverton Schirmann Rosati",
      "Wenyberg De Mello Nunes",
      "Alana Jaqueline Bellini Oliveira",
      "Rodrigo Do Carmo Souza",
      "Igor Figueiró Do Amaral",
      "Emilaine Zorzi Leandro",
      "Thalison Moreira Gouveia",
      "Vinicius Brandao Borges",
      "Renan Nogueira Navarro",
      "Kevin Macalisrer Nogueira Barcellos",
      "Afonso Cabreira Leao",
      "Waldemar Santana Oliveira",
      "Naijara Da Silva Dias",
      "Ricardo Pereira Da Cruz Junior",
      "Abner Diniz Sampaio Dos Santos",
      "Lucas Batista Silva",
      "Gabriel Lopes Almeida",
      "Joao Gabriel Da Silva Dantas",
      "Joao Paulo Pereira Montessi",
      "Luiz Eduardo Da Paz Vitor",
      "Kamaykel Santos De Oliveira",
      "Jaime Gomes De Souza",
      "Adriano Hilario Talarico Soletti",
      "William Geovani Pinesso",
      "Maraisa Mendes",
      "Luiz Henrique Martins Medeiros",
      "Patricia De Kassia Vasconcelos",
      "Ana Carolina Vituriano Souza",
      "Lucas Ribeiro Pires",
      "Lucas Da Silva Machado",
      "Diogenes Mauricio Machado",
      "Marcus Vinicius Neves Caetano",
      "Rodrigo Duarte Bono Belascusa",
      "Eurico Renan Martins Dos Santos",
      "Eliseo Brites De Moraes Neto",
      "Renata Camila Da Costa Silva",
      "Gabrielly Aparecida Marques Ribeiro",
      "Laís Michels Fonseca",
      "Eder Benites Petzold",
      "Bruno Henrique Simões",
      "Eberle Taysson Pereira Maciel",
      "Arthur Victor Leon Caiubi Souza Silva",
      "Vanessa Mendes Da Silva De Oliveira (Sub judice)",
      "Moacir Felipe Araujo Lescano",
      "Giovana Viêro Peccini",
      "Bianca Cassupa Pereira",
      "Juliany Brito De Araujo",
      "Jean Carlos Vilela De Melo",
      "Carla Priscila Ferreira Miranda",
      "Lucas Souza Gimenes",
      "Danielle Aguena Martos Costa",
      "Thiago Germano De Figueiredo",
      "Isaias Simoel Gimenez Miotti",
      "Fernando Borges Zwicker",
      "Jamielle Fernanda Duarte De Amorim",
      "Vitor Hugo Da Silva Santos",
      "Neemias De Souza Jeremias",
      "Rick Kendy Iwashiro",
      "Alisson Monteiro Calazans",
      "Fernanda Isfran Da Silva",
      "Mattheus Cardenas Souza",
      "Michael Francisco Da Silva (Sub judice)",
      "Giovani Teixeira Da Silva (Sub judice)",
      "Gustavo Rodrigues Lemes",
      "Nathalia Welika Dos Santos Araujo",
      "Magno Leoncio Sanches Saraiva",
      "Luís Flávio Isaías Lopes",
      "Lucas Matos Do Nascimento",
      "Janaína Da Silva Carvalho Santos",
      "Mauricio Matheus De França Araujo",
      "Junior Cesar Rodrigues Colombo",
      "Isaque Meleschco Arguelho",
      "Maíra De Brito Rodrigues Alves",
      "Rafael Vasques Ribeiro",
      "Thalia Da Silva Bezerra",
      "Thor Brum De Oliveira",
      "Gustavo Ribeiro Dos Santos",
      "Felipe David De Oliveira",
      "Marcos Da Silva Rezende",
      "Stefan Wolff",
      "Gabrielle Angel Leiko Rezende Nakashima",
      "César Francisco Quirino",
      "Renan Matheus Oliveira Do Nascimento",
      "Bruno Noé Eger Sampaio",
      "Raquel Aparecida Lima Silva",
      "Rafael Henrique Nogueira Roncada",
      "Francisco Rondon Neto",
      "Henrique Barbosa Coelho",
      "Lucas Farias Alves",
      "Taina Da Silva",
      "José Davi Da Silva De Oliveira",
      "Elaine Maria Ramos Dos Santos",
      "Rafael Lemos",
      "Ana Julia Muniz Lemes",
      "Laércio Antonio De Sena Júnior",
      "Nikolas Rezende Obregão Nogueira",
      "Wesley Pereira Dos Santos",
      "Moises Sousa Santiago",
      "Fábio Cabral De Moraes",
      "Tiago Tadeu Mendes Nepomuceno Salles",
      "Hercules Miranda Da Silva",
      "Rogerio Mendes Da Silva",
      "Arthur Natan Santos Silva",
      "Matheus Da Cruz Alves",
      "Luana Cristina Avelino",
      "Álysson Igor Rodrigues Leite",
      "Geovane Da Rocha Silva",
      "Quezia Jaime De Jesus",
      "Danilo Barbosa Lima De Santana",
      "Cleiton Rodrigues De Oliveira",
      "Joao Marcos Vilela Lopes",
      "João Vitor De Araújo Cunha",
      "Andressa Patricia Soares De Castro",
      "Rafael Theodoro Serpa",
      "Alberto José Paim De Lima Filho",
      "Aline Stefani Lima Ostemberg",
      "Elis Fernanda Da Silva Oliveira",
      "Amanda Dourado Espindola",
      "Paulo André Argerin Rossatto",
      "Bárbara Ribeiro Remonti",
      "Evania Custódio Lopes",
      "Gabriel Matheus Gouveia De Lima",
      "Tainá Marques Taborga Sandim",
      "Paloma Grazielli Gomes Dos Anjos",
      "Brian Girotto",
      "Gleici Ferreira Furman",
      "Daniel Chaves Martins",
      "Izamara Casadia",
      "Douglas Sousa Tosta",
      "Vinicius Eduardo De Almeida Santos",
      "Patrick Emerson Da Costa",
      "Fúlvio Souza De Souza",
      "Alana De Sousa Oliveira Gamarra",
      "Carla Rebecca Barreto De Aguiar Esteves",
      "Lucio Vinicius Santos De Souza",
      "Edilene Da Silva Maldonado",
      "Herick Pereira Magalhaes",
      "Douglas Brito De Oliveira",
      "Bruno Jesus Dourado",
      "Kawam Gabriel Rodrigues Campos",
      "Thiago Vinicius Fonseca De Oliveira",
      "Daniely Silva De Albuquerque",
      "Angélica Freire Bettencourt",
      "Leandro Carvalho De Souza",
      "Augusto De Almeida Damasceno",
      "Renato Ossuna Da Silva",
      "Jefferson Canabarra Peixoto",
      "Luciano Junior Torale Gonçalves",
      "Lucas Henrique De Sena Marques",
      "Flavio Alves Ribeiro",
      "Willian De Oliveira Papa",
      "Jaiane Dayci Silva",
      "Gabriel De Oliveira Antunes",
      "Wesley Souza Almeida",
      "Gabriela Caroline De Souza",
      "Nathaly Gonçalves Leite Lima",
      "Liene Cristina De Oliveira Rodrigues Moreira",
      "Renan Pereira Coimbra",
      "Reginaldo Muller Pinto Gerolin",
      "Damiao Caboclo Da Silva",
      "Marcos Henrique Da Cunha Franco",
      "Neyenne Caldeira Rocha Lopes",
      "Leonardo Santos Correia",
      "Celino Magalhães Filho",
      "Mozane Evelin Vilela Teodoro",
      "Arthur Rodrigues De Mendonca",
      "Wellinton Menezes Grance",
      "Alessandro Gonçalves Da Silva",
      "Thiago Wotekoski Iglesias",
      "Fábio Andrade Dos Santos Silva",
      "Karthylith Rodrigues Vianna",
      "Marcelo Henrique Nogueira Dos Santos",
      "Jeovana Lima Gavilan",
      "Munir Sami Campitelli Ibrahim",
      "Gabriel Rodrigues De Oliveira",
      "Alice Dos Santos Saab",
      "Lady Maria Canhete Contrera",
      "Edlene De Souza Haveroth",
      "Marlon Gabriel De Souza Silva",
      "Larissa Cruz Lopes",
      "Tamires Raquel Aguirre Arevalo",
      "Diego Benedito Da Silva Moreira",
      "Luana Maria Sandim Santos",
      "Alex Lima De Souza",
      "Murilo De Souza Rodrigues",
      "Luiz Henrique Costa De Oliveira",
      "Lincon Eder Ribeiro Valverde",
      "Andrey Jeverson Pereira Da Silva Morais",
      "Andressa Sousa Santos Coqueiro",
      "Joshuan Sousa Valdez",
      "Fernando Pereira Sales",
      "Vinicius De Araujo Marques",
      "Jessika Ribeiro Mimoso",
      "Ana Carolina Ormond De Souza Carvalho",
      "Murilo Henrique Bezerra Araújo",
      "Daniel Guttemberg Ferreira De Brito",
      "Lucas Xavier De Souza Oba (Sub Judice)",
      "Andressa Da Silva Lovera",
      "Joao Pedro Machado Neres",
      "Bruna Pereira Schumann",
      "Luiz Fernando Milagres Alves",
      "Maycon Fernando Da Gloria Toledo",
      "David Rodrigues Ribeiro",
      "Luana Schubert",
      "Rafael Peres Ramiro",
      "Ludson De Lima Vargas",
      "Alan Da Silva Casal Batista",
      "Thiago Ramos De Lima",
      "João Pedro Dim Bergi",
      "Djalma Henrique Rezende Veiga",
      "Gisele Marques Da Silva",
      "Rafaela Vieira Neiva",
      "Leonardo Felipe De Almeida",
      "Vinnicius Silva Borges",
      'Willia Lino Souza',
      'Abimael Correia Marques',
      'Gelson Firmo',
      'Paulo Ricardo Da Silva De Freitas',
      'Marcelo Pimenta Da Silva',
      'Vinicius Rovari De Cristo',
      'Murilo Henrique Medeiros Rosa',
      'Jéssyca Ellen Weissinger',
      'Henrique Bispo Vaz',
      'Pablo Giovane De Oliveira De Souza Maldonado',
      'Jessica Hillary Melo Sobrinho',
      'Laura Félix Barbosa',
      'Jéferson Salla',
      'Ulpiano Jacquet Filho',
      'Rânily Ribeiro Graça',
      'Camila De Souza Gonçalves',
      'Felipe Martins De Souza Costa',
      'Jean Luca Dos Reis Bobadilha',
      'Sidnei Gonçalves Ortega',
      'Mateus Penha Ribeiro Da Silveira',
      'Mauro Vieira Da Costa',
      'Talicia Camila Bezerra Carvalho',
      'Débora De Souza Ferreira',
      'Brenda Ferreira Caríssimo Picorelli',
      'Ingrit Amarante Sabino De Oliveira',
      'João Gabriel Mendes Chaves',
      'Bruno Ferreira Peres',
      'Jônatas Triunfo Da Silva Nascimento',
      'Vitor Nantes Lemos',
      'Felipe Barros Garcia',
      'Alisson Vinicius Da Silva Lima',
      'Vinícius Moraes Menezes',
      'Israel Pinto Da Silva Filho',
      'Gustavo Metello',
      'Evellyn Martinez Maia',
      'Bruno Pereira Carvalho Barbosa',
      'Alécio Andrade Leite',
      'Bruna Larissa Gonçalves Pires',
      'Felipe Rezende De Oliveira Lima',
      'Nathalia Gonçalves Da Silveira',
      'Gustavo Henrique Medeiros De Oliveira',
      'Misael Lima De Mesquita Júnior',
      'Daniel Kerestesi Freire',
      'Laercio Cassel Dos Santos',
      'Diego Henrique Da Silva Carvalho',
      'Andressa Batista Espirito Santo',
      'Rivelton Silva De Moraes',
      'Caique Gomes De Oliveira',
      'Nathalia Yasmine Tolentino Vilela',
      'Nayanne Rodrigues Gervasio',
      'Ana Júlia Barbosa Aguilera',
      'Caio Lucas Oliveira Andrade',
      'Andressa Porto De Oliveira',
      'Mateus David Dutra Pereira',
      'Cristiane Matos Da Silva',
      'Lucas Mendonça Vargas',
      'Wuilker Rafael Da Silva Garcia',
      'Carlos Eduardo Dos Santos Dias',
      'Leonardo Bruno Fernandes Moreira',
      'Inara Freitas Do Nascimento',
      'Kenia Rocha Tavares',
      'Ivan Tobias De Oliveira',
      'Eduardo Silveira Damaceno',
      'Paulo Cesar De Souza Novaes',
      'Wesley Joao Rodrigues',
      'Tércio Arévalo De Aquino',
      'Alan Nunes De Souza',
      'Luiz Eduardo De Jesus Guedes',
      'Antonio Luan De Lima',
      'Leandro Dias Catellan Teixeira',
      'Vinicius Henrique Gonçalves Portilho',
      'Lucas Vinícius Almiron Dos Santos',
      'Wender Pereira',
      'Higor Rodrigues Oliveira',
      'Vinicius Correa Bianco',
      'Iara Aparecida Ribeiro',
      'Karoline Melo De Oliveira Pi Ferrario',
      'Fernando Henrique Assis De Andrade',
      'Leticia Dantas Da Silva (Sub judice)',
      'Rafael Ferreira Segundo',
      'Daniel Macedo Matos Da Silva',
      'Gustavo Henrique Dos Santos Noetzold',
      'Gabriel Felix Cabral',
      'Milene Silva Lima Bomfim',
      'Ingrid Tuanne Do Carmo Dias',
      'Caio Da Silva Laguna',
      'Marcus Vinycius Lourenço Ferreira',
      'Jéssica Ayumi Uehara Aguilera',
      'Bruno Henrique Da Silva Martins',
      'Renan Wilson Varanis Da Silva',
      'Renato Stoco De Machado',
      'Renato De Alencar Ricaldes',
      'Luany Thaynara Louzan',
      'Adailton Pireli Costa',
      'Igor Cesar Severo Antunes',
      'Lucas Lincoln De Oliveira Matsumoto',
      'Bruna Camila Ajala Araldi',
      'Vinicius Araujo Soares',
      'Jean Marcos Franco De Souza',
      'Vinicius Guimaraes De Carvalho',
      'Wilian Oliveira De Freitas',
      'Fernando Numeriano De Oliveira',
      'Lucas Calixto Paz Bezerra',
      'Kelly Cristina Cândido Dos Santos',
      'Isabela De Oliveira Da Riva',
      'Weverton Gabriel De Barros Marques',
      'Wevertton Cristiano Anjos Dos Santos',
      'Lucas Dias Pinheiro',
      'Jailzon Da Silva Rodrigues',
      'Marcel Junio Da Silva Souza',
      'Mailson Francisco Da Silva',
      'Marcos Augusto De Sousa',
      'Kaio Lima Da Silva',
      'Rubiany Vasconcelos Duarte',
      'Alan Carlos Miranda De Oliveira Cruz',
      'Ronaldo Menão Jesus',
      'Julia Beatriz Paz Pedroso',
      'Ulisses Guimarães Sanches',
      'Geraldo Claudio Pereira',
      'Cleber Da Silva Ramirez',
      'Mariana Pereira De Almeida',
      'Pedro Paulo Machado Rodrigues',
      'Joice Cristina Moreno Fernandes',
      'João Victor Fagundes Silva',
      'Nicole Bezerra Vaz',
      'Beatriz Da Silva Pimenta',
      'Ranon Louran Do Espirito Santo Costa',
      'Mayse Rice Silveira Cardoso',
      'Osvaldo Gonzalez',
      'Mira Celi Nazare Dias Basilio',
      'Steffano Mingotti Dias',
      'Vitor Da Silva Lima',
      'Murilo De Lima Silva',
      'Raphaela Heloína Schiemann',
      'Felipe Wellington De Oliveira Sousa',
      'Marinara Alexandre Da Silva',
      'Tiago Wisenfad Lopes',
      'André Luiz Pereira Leite Junior',
      'Edinei Machado De Almeida',
      'Paulo Henrique Ferreira Do Nascimento',
      'Aldair Canuto Do Nascimento',
      'Fabrício Palmeira Rios Santos',
      'Adna Da Silva Rabello',
      'Léo De Medeiros Guimarães Neto',
      'Ana Carolina Mugarte Potrich',
      'Lucas Bryan Alencar De Oliveira',
      'Rodrigo Da Rocha Rosati',
      'Martinho Eduardo Pereira Filho',
      'Juliana De Rezende De Souza',
      'Jose Robson Sanabria Trindade',
      'Rayani Barros Freitas',
      'Daniela Oliveira De Souza',
      'Flávio Luis Villalba Urquiza Junior',
      'Gladison Bezerra Vieira',
      'Vinícius Argemon Pereira Benites',
      'Luiz Henrique Alves De Oliveira',
      'Mateus Pinheiro De Oliveira',
      "Jéssica Ferreira Cescon",
      "Danielle Dos Santos Souza",
      "Augusto Gameiro",
      "Thiago Fagundes Lemos",
      "José Eduardo Duarte Da Silva",
      "Icaro Almeida Lemos Alves",
      "Lauro Dalaqua Junior",
      "Fernando Jorge De Lima",
      "Ana Paula Rezende Dos Santos",
      "Sindi Sabrina Pedroso Cubilla",
      "Gustavo Da Silva Aparecido",
      "Samuel Lucas Diniz",
      "Cleber Da Silva",
      "Daniel Almada Messa",
      "Danilo Eugênio Ferreira Moraes",
      "Rafaely Carvalho Alves",
      "Viviane Inez Satirito Silvestre",
      "Gleidson Souza Carvalho",
      "Raul Do Amaral Vieira",
      "Gabriella Gazola De Melo",
      "Junio Ferreira Da Silva",
      "Carlos Pedro Meiato Da Silva",
      "Alison Perira Braga",
      "Leandro Barros Schencknecht",
      "Bruna Ferreira Garbin",
      "Gabriel Martins Duarte",
      "Sanny Mara Dos Santos Lima",
      "Larissa Dos Santos Costa",
      "Anay Crystyna Freitas De Souza",
      "Henrique De Souza Santos",
      "Matheus Almeida De Moura Monteiro De Oliveira",
      "Fernanda Antunes Rezende",
      "Lucas Costa Soares",
      "Emilly De Lima Moraes",
      "Rafael Madeira De Oliveira",
      "Érica Freitas Rojas Vieira",
      "Natalia Ester Correa Ramalho",
      "Vitor Augusto Souza De Carvalho",
      "Sayuri Hirasaka",
      "Lethicia Megaioli De Oliveira",
      "Adeandrea Peixoto Moraes Santana",
      "Willian Costa Dias",
      "Alexandre Rosa Flores",
      "Luiz Pegoraro Junior",
      "Danilo Maciel De Lima",
      "Thiago Da Silva Martins",
      "Pâmela Fernandes Pereira",
      "Junior Hoinoski Cordeiro",
      "Diego Pereira Coelho",
      "Luiz Henrique Silva Dos Santos",
      "Raiane Da Silva",
      "Bianca Marques Dos Santos",
      "Haryson Lucas De Souza Jorge",
      "Petronio Neres Da Silva",
      "Luana Neves Da Silva",
      "Munyr Luna Barion",
      "Rodrigo Orro De Campos Viega",
      "Jó Noélcio Anoar De Melo Ávila",
      "Regiane Vitoria Perin Ortega",
      "Bruno Gracini Macedo",
      "Joilhan Kelvis De Assis Pires",
      "Rafael Angelozi De Souza",
      "Jean Carlos De Freitas Da Silva",
      "Pedro Henrique Fuzario Custodio",
      "Weslen Dos Santos Resende",
      "Jeferson Rolon De Assis",
      "Farney Mendes Fontoura",
      "Matheus Andriu De Miranda Silva",
      "Jéfiton De Souza Polidório",
      "Matheus Henrique De Lima Vilela",
      "Eziel Do Amaral Centurion",
      "Abimael Vicente De Souza Machado",
      "Wagner Alves Pereira",
      "Paulliane Martins Souza",
      "Jeferson Saucedo Amorim",
      "Willian Villamayor Fernandes Da Silva",
      "Diego Da Silva Souza",
      "Lucas Vaz Nemezio Da Silva Silveira",
      "Ana Paula Fortes",
      "Pamela Ferraz De Albuquerque",
      "Wenderson Da Silva Cavalcante",
      "Thécia Lourenço Furtado",
      "Alisson Araujo Ferreira",
      "Gabriel Abrahão Gomes De Oliveira",
      "Fuad Alessandro Gonçalves Da Rocha",
      "Rodrigo Onofre Maurer Tavares",
      "Rafael Torquato De Escobar",
      "Amanda Da Silva Gomes",
      "Fabricio Santos E Costa Salgado",
      "Matheus Dos Santos Pitol",
      "Leonardo Da Rosa Aivi",
      "Giullian Batista Vialle",
      "Lincoln Calistro Berro",
      "Jose Gomes Pereira Neto",
      "Natalia Evelin Alves Dos Reis",
      "Isabella Fidelis",
      "Carlos Eduardo Da Silva Filho",
      "Matheus Ferreira Sonohata",
      "Raphael Vilalva De Queiroz",
      "Lucas Ovelar Leme",
      "Eduardo Santana De Moura Sousa",
      "Wellington Flores De Castro",
      "Luiz Henrique Schorn",
      "Tiago Andre Da Silva Dias",
      "Cássio Sales Cassimiro",
      "Luciane Oliveira Portela Pissini",
      "Luis Henrique Silva Leao",
      "Gabriel Schmitt Schroeder",
      "Daniel Nunes Guimarães",
      "Julio Cesar Seccatto",
      "Fernanda Mortari Végas",
      "Deivid An Martins De Arruda",
      "Marcos Eloy Giron",
      "Thiago Aparecido Ramos Pertile",
      "Laurielene Elen Arruda Silva Deodato",
      "Heloísa Polacchine Leite",
      "Bárbara Marinho Azevedo",
      "Cristhian Freitas Batista",
      "Julio Cesar Torres Junior",
      "Raul Murilo Camacho Seba",
      "Polyana Jessyca Felisardo Gonçalves Wruck",
      "Carlos Henrique Cabanhas De Oliveira",
      "Fani Elizabeth Ojeda",
      "José Fernando Manzione Paes De Barros",
      "Caio Alexandre Navarro Antonio",
      "Mikael Dos Santos Ortiz",
      "Carlos Eduardo Martins Silva",
      "Gabriel Florenciano Ferreira",
      "Adeilson Rodrigues Faria",
      "Watson Lima Da Silva",
      "Leonardo Paniago Teodoro Almeida",
      "Luan Matheus Da Silva Amorim",
      "José Euclides Da Silva Neto",
      "Michele Kuchar Matte",
      "Camila Santiago Da Silva",
      "Wanderley Campos Pereira Junior",
      "Rhaiana Borges Pereira",
      "Pamela Aparecida Azevedo De Paula",
      "Huender Lucas Farias De Sousa",
      "Lucas Barros Garcia",
      "Luiz Felippe Antunes Ribeiro",
      "Natália Godoi De Oliveira Fagundes",
      "Michael Carmona De Almeida",
      "Daniel Paredes De França",
      "Millena Christine Dezan Da Fonseca",
      "Wanderson Bach Queiroz",
      "Renan Mamedes Delmão De Sena",
      "Larissa Iara Alem de Oliveira",
      "Thais Ferreira Mendes",
      "Beatriz Carvalho Sottolano",
      "Janaina Oliveira Lacerda",
      "Havana Fardim da Gama"
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