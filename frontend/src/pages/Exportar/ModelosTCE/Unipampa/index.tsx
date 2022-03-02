import { Campus, Solicitacao } from '../../../../models';
import styles from './index.module.css';

interface Props {
  solicitacao: Solicitacao;
}

export const Unipampa = ({
  solicitacao: { estagiario, unidadeConcedente, instituicao },
}: Props) => {
  return (
    <div className={styles.body}>
      <b>TERMO DE COMPROMISSO DE ESTÁGIO - TCE</b>
      <p>Fundamento Legal - Lei nº 11.788, de 25 de setembro de 2008.</p>
      <p>
        Com base na legislação vigente, as partes a seguir nomeadas acordam e
        estabelecem entre si as cláusulas e condições que regerão este Termo de
        Compromisso de Estágio.
      </p>
      <b>ESTAGIÁRIO</b>
      <table className={styles.tg}>
        <tbody>
          <tr>
            <td className={styles['tg-73oq']} colSpan={2}>
              Nome: {estagiario.nome}
            </td>
            <td className={styles['tg-73oq']} colSpan={2}>
              Email: {estagiario.email}
            </td>
          </tr>
          <tr>
            <td className={styles['tg-73oq']} colSpan={2}>
              Endereço: {estagiario.endereco}
            </td>
            <td className={styles['tg-73oq']}>Bairro: {estagiario.bairro}</td>
            <td className={styles['tg-73oq']}>CEP: {estagiario.cep}</td>
          </tr>
          <tr>
            <td className={styles['tg-73oq']}>Cidade: {estagiario.cidade}</td>
            <td className={styles['tg-73oq']}>UF: {estagiario.uf}</td>
            <td className={styles['tg-73oq']} colSpan={2}>
              Telefone: {estagiario.telefone}
            </td>
          </tr>
          <tr>
            <td className={styles['tg-73oq']} colSpan={2}>
              RG: {estagiario.rg}
            </td>
            <td className={styles['tg-73oq']} colSpan={2}>
              CPF: {estagiario.cpf}
            </td>
          </tr>
          <tr>
            <td className={styles['tg-73oq']} colSpan={2}>
              Semestre: {estagiario.semestre}
            </td>
            <td className={styles['tg-73oq']} colSpan={2}>
              Curso: {estagiario.curso}
            </td>
          </tr>
          <tr>
            <td className={styles['tg-73oq']} colSpan={2}>
              Campus: {(estagiario.campus as Campus).cidade}
            </td>
            <td className={styles['tg-73oq']} colSpan={2}>
              Matrícula Nº: {estagiario.matricula}
            </td>
          </tr>
          <tr>
            <td className={styles['tg-73oq']} colSpan={4}>
              Estágio curricular:{' '}
              {estagiario.estagioObrigatorio
                ? 'Obrigatório'
                : 'Não obrigatório'}
            </td>
          </tr>
        </tbody>
      </table>
      <b>UNIDADE CONCEDENTE</b>
      <table className={styles.tg}>
        <tbody>
          <tr>
            <td className={styles['tg-73oq']} colSpan={4}>
              Razão social: {unidadeConcedente.razaoSocial}
            </td>
          </tr>
          <tr>
            <td className={styles['tg-73oq']} colSpan={2}>
              Endereço: {unidadeConcedente.endereco}
            </td>
            <td className={styles['tg-73oq']}>
              Bairro: {unidadeConcedente.bairro}
            </td>
            <td className={styles['tg-73oq']}>CEP:{unidadeConcedente.cep}</td>
          </tr>
          <tr>
            <td className={styles['tg-73oq']}>
              Cidade: {unidadeConcedente.cidade}
            </td>
            <td className={styles['tg-73oq']}>UF: {unidadeConcedente.uf}</td>
            <td className={styles['tg-73oq']} colSpan={2}>
              Telefone: {unidadeConcedente.telefone}
            </td>
          </tr>
          <tr>
            <td className={styles['tg-73oq']} colSpan={2}>
              CNPJ: {unidadeConcedente.cnpj}
            </td>
            <td className={styles['tg-73oq']} colSpan={2}>
              Ramo de atividade: {unidadeConcedente.ramoDeAtividade}
            </td>
          </tr>
          <tr>
            <td className={styles['tg-73oq']} colSpan={2}>
              Representante Legal: {unidadeConcedente.representanteLegal}
            </td>
            <td className={styles['tg-73oq']} colSpan={2}>
              Cargo: {unidadeConcedente.cargoRepresentante}
            </td>
          </tr>
          <tr>
            <td className={styles['tg-73oq']} colSpan={2}>
              Supervisor Estágio: {unidadeConcedente.supervisorEstagio}
            </td>
            <td className={styles['tg-73oq']} colSpan={2}>
              Cargo: {unidadeConcedente.cargoSupervisor}
            </td>
          </tr>
        </tbody>
      </table>
      <b>INSTITUIÇÃO DE ENSINO</b>
      <table className={styles.tg}>
        <tbody>
          <tr>
            <td className={styles['tg-73oq']} colSpan={2}>
              Razão social: {instituicao.razaoSocial}
            </td>
            <td className={styles['tg-73oq']} colSpan={2}>
              Campus: {(instituicao.campus as Campus).cidade}
            </td>
          </tr>
          <tr>
            <td className={styles['tg-73oq']} colSpan={2}>
              Endereço: {instituicao.endereco}
            </td>
            <td className={styles['tg-73oq']}>Bairro: {instituicao.bairro}</td>
            <td className={styles['tg-73oq']}>CEP: {instituicao.cep}</td>
          </tr>
          <tr>
            <td className={styles['tg-73oq']}>Cidade: {instituicao.cidade}</td>
            <td className={styles['tg-73oq']}>UF: {instituicao.uf}</td>
            <td className={styles['tg-73oq']} colSpan={2}>
              Telefone: {instituicao.telefone}
            </td>
          </tr>
          <tr>
            <td className={styles['tg-73oq']} colSpan={4}>
              CNPJ: {instituicao.cnpj}
            </td>
          </tr>
          <tr>
            <td className={styles['tg-73oq']} colSpan={2}>
              Representante Legal: {instituicao.representanteLegal}
            </td>
            <td className={styles['tg-73oq']} colSpan={2}>
              Cargo: {instituicao.cargoRepresentante}
            </td>
          </tr>
          <tr>
            <td className={styles['tg-73oq']} colSpan={4}>
              Orientador Estágio: {instituicao.orientadorEstagio}
            </td>
          </tr>
        </tbody>
      </table>
      <div style={{ textAlign: 'left' }}>
        <p>
          <b>CLÁUSULAS DO TCE:</b>
        </p>
        <p>
          <b>CLAÚSULA 1ª - OBJETO</b>
        </p>
        <p className={styles.p}>
          Esse TCE decorre e fica vinculado ao Convênio, instrumento jurídico
          facultativo às instituições de ensino conforme o Artigo 8º da Lei
          11.788/08, celebrado entre a UNIPAMPA e a UNIDADE CONCEDENTE, e tem
          por finalidade proporcionar experiência prática na linha de formação
          do Estagiário, em complemento e aperfeiçoamento do seu curso.
        </p>
        <p>
          <b>CLAÚSULA 2ª - VIGÊNCIA</b>
        </p>
        <p className={styles.p}>
          O presente TCE vigerá de à podendo ser prorrogado por igual período. A
          cada 06 (seis) meses, o “ESTAGIÁRIO”, obrigatoriamente, comprovará sua
          aprovação escolar e freqüência regular no período anterior, sob pena
          de rescisão do TCE a que se refere esta cláusula.
        </p>
        <p>
          <b>CLAÚSULA 3ª - LOCAL, ATIVIDADES, JORNADA E RECESSO</b>
        </p>
        <p className={styles.p}>
          As atividades a serem desenvolvidas durante o estágio, objeto do
          presente TCE, constarão no Plano de Atividades construído pelo
          ESTAGIÁRIO em conjunto com a UNIDADE CONCEDENTE e orientado por
          professor da UNIPAMPA.
        </p>
        <p className={styles.p}>
          O Plano de Atividades do estagiário deverá ser incorporado ao TCE por
          meio de aditivos à medida que for avaliado, progressivamente, o
          desempenho do estudante, (Art. 7º, parágrafo único da Lei nº
          11.788/08).
        </p>
        <p className={styles.p}>
          As atividades não podem exceder a ( ) horas diárias, perfazendo um
          total de ( ) horas semanais, e deve ser realizado em período
          compatível com o seu horário escolar, e serão desenvolvidas pelo
          ESTAGIÁRIO no setor da UNIDADE CONCEDENTE.
        </p>
        <p className={styles.p}>
          A jornada diária será das ( ) as ( ) e das ( ) as ( ), com intervalo
          de ( ) horas.
        </p>
        <p className={styles.p}>
          Nos períodos de férias acadêmicas, a jornada de estágio será
          estabelecida de comum acordo entre o ESTAGIÁRIO e a UNIDADE
          CONCEDENTE.
        </p>
        <p className={styles.p}>
          É assegurado ao estagiário, sempre que o estágio tenha duração igual
          ou superior a 1 (um) ano, período de recesso de 30 (trinta) dias, a
          ser gozado preferencialmente durante suas férias escolares.
        </p>
        <p>
          <b>CLAÚSULA 4ª - SEGURO CONTRA ACIDENTES PESSOAIS</b>
        </p>
        <p className={styles.p}>
          Na vigência do presente TCE, o ESTAGIÁRIO será incluído na cobertura
          do Seguro Contra Acidentes Pessoais, nos Termos do Inciso IV e do
          parágrafo único do Art. 9º da Lei nº 11.788/08, sob responsabilidade
          da , apólice nº , da Companhia , conforme Certificado Individual de
          Seguro, fornecido ao estagiário.
        </p>
        <p>
          <b>CLÁUSULA 5ª - DO VÍNCULO EMPREGATÍCIO</b>
        </p>
        <p className={styles.p}>
          Nos termos do disposto no Art. 3º da Lei nº 11.788/08 o estágio não
          criará vínculo empregatício de qualquer natureza entre o ESTAGIÁRIO, a
          UNIDADE CONCEDENTE e a UNIPAMPA.
        </p>
        <p>
          <b>CLÁUSULA 6ª - DA BOLSA E AUXÍLIO TRANSPORTE</b>
        </p>
        <p className={styles.p}>O estágio será:</p>
        <p className={styles.p}>
          Remunerado, pelo qual o estagiário receberá uma bolsa de
          Complementação Educacional mensal, no valor de R$ ( ) , que deverá ser
          paga até o 5º (quinto) dia útil do mês subsequente.
        </p>
        <p className={styles.p}>
          Não remunerado, conforme permite o Art. 12º da Lei nº 11.788/08,
          devendo, porém, objetivar a complementação do ensino e da aprendizagem
          profissional do aluno.
        </p>
        <p className={styles.p}>
          A concessão de bolsa ou outra forma de contraprestação, bem como o
          auxílio transporte é compulsória somente na hipótese de estágio
          curricular não obrigatório.
        </p>
        <p className={styles.p}>
          O estagiário receberá auxílio transporte no valor de R$ ( ), pago até
          o 1º (primeiro) dia do mês, e outros auxílios como ( ).
        </p>
        <p>
          <b>CLÁUSULA 7ª - ATRIBUIÇÕES E RESPONSABILIDADES</b>
        </p>
        <b>Da UNIDADE CONCEDENTE</b>
        <ol type='a' className={styles.ol}>
          <li>
            Celebrar esse termo de compromisso com a UNIPAMPA e o educando,
            zelando por seu cumprimento;
          </li>
          <li>
            Ofertar instalações que tenham condições de proporcionar ao educando
            atividades de aprendizagem social, profissional e cultural;
          </li>
          <li>
            Indicar funcionário de seu quadro de pessoal, com formação ou
            experiência profissional na área de conhecimento desenvolvida no
            curso do estagiário, para orientar e supervisionar até 10 (dez)
            estagiários simultaneamente;
          </li>
          <li>
            Por ocasião do desligamento do estagiário, entregar termo de
            realização do estágio com indicação resumida das atividades
            desenvolvidas, dos períodos e da avaliação de desempenho;
          </li>
          <li>
            Manter à disposição da fiscalização documentos que comprovem a
            relação de estágio;
          </li>
          <li>
            Enviar à UNIPAMPA, com periodicidade mínima de 6 (seis) meses,
            relatório de atividades, com vista obrigatória ao estagiário.
          </li>
          <li>
            Comunicar à UNIPAMPA dados básicos sobre o andamento do estágio, bem
            como irregularidades que justifiquem intervenção;
          </li>
          <li>
            Subsidiar a UNIPAMPA com informações que propiciem o aprimoramento
            do sistema acadêmico e do próprio estágio;
          </li>
          <li>
            Comunicar a UNIPAMPA em caso de prorrogação ou rescisão deste TCE
            ou, também, em caso de efetivação do estudante;
          </li>
          <li>
            Propiciar ao ESTAGIÁRIO, sempre que o estágio tenha duração igual ou
            superior a 1 (um) ano, período de recesso de 30 (trinta) dias, a ser
            gozado preferencialmente em suas férias escolares. O recesso deverá
            ser remunerado quando o estagiário receber bolsa ou outra forma de
            contraprestação, e os dias de recesso previstos serão concedidos de
            maneira proporcional, nos casos de o estágio ter duração inferior a
            1 (um) ano.
          </li>
        </ol>
        <b>Do ESTAGIÁRIO</b>
        <ol type='a' className={styles.ol}>
          <li>
            Estar regularmente matriculado na UNIPAMPA, em semestre compatível
            com a prática exigida no estágio;
          </li>
          <li>
            Cumprir fielmente a programação do estágio comunicando a UNIPAMPA
            qualquer evento que impossibilite a continuação de suas atividades;
          </li>
          <li>
            Atender as normas internas da UNIDADE CONCEDENTE, principalmente às
            relativas ao estágio, que declara, expressamente, conhecer,
            exercendo suas atividades com zelo, exação, pontualidade e
            assiduidade;
          </li>
          <li>
            Comunicar à UNIPAMPA e à UNIDADE CONCEDENTE, conclusão, interrupção
            ou modificação deste TCE, bem como fatos de interesses ao andamento
            do estágio;
          </li>
          <li>
            Responder pelo ressarcimento de danos causados por seu ato doloso ou
            culposo a qualquer equipamento instalado nas dependências da UNIDADE
            CONCEDENTE durante o cumprimento do estágio, bem como por danos
            morais e materiais causados a terceiros;
          </li>
          <li>
            Participar de todas as atividades inerentes à realização dos
            estágios (reuniões de trabalho, avaliação, planejamento, execução,
            entre outras);
          </li>
          <li>
            Desempenhar com ética e dedicação todas as atividades e ações que
            lhe forem designadas;
          </li>
          <li>
            Cumprir a programação estabelecida para o estágio, comunicando em
            tempo hábil a eventual impossibilidade de fazê-lo;
          </li>
          <li>
            Comunicar à UNIPAMPA, qualquer fato relevante sobre seu estágio;
          </li>
          <li>
            Elaborar e entregar ao orientador de estágio designado pela
            UNIPAMPA, para posterior análise da UNIDADE CONCEDENTE e/ou da
            UNIPAMPA, relatório(s) sobre seu estágio, na forma, prazo e padrões
            estabelecidos;
          </li>
          <li>Cumprir o horário estabelecido nesse TCE.</li>
        </ol>
        <b>Da UNIPAMPA</b>
        <ol type='a' className={styles.ol}>
          <li>
            Coordenar, orientar e responsabilizar-se, para que a atividade de
            estágio curricular seja realizada como procedimento
            didático-pedagógico;
          </li>
          <li>
            Observar o cumprimento da legislação e demais disposições sobre o
            estágio curricular;
          </li>
          <li>
            Avaliar as instalações da parte concedente do estágio e sua
            adequação à formação cultural e profissional do educando;
          </li>
          <li>
            Indicar professor orientador, da área a ser desenvolvida no estágio,
            como responsável pelo acompanhamento e avaliação das atividades do
            estagiário;
          </li>
          <li>
            Exigir do educando a apresentação periódica, em prazo não superior a
            6 (seis) meses, de relatório das atividades;
          </li>
          <li>
            Zelar pelo cumprimento do termo de compromisso, reorientando o
            estagiário para outro local em caso de descumprimento de suas
            normas;
          </li>
          <li>
            Elaborar normas complementares e instrumentos de avaliação dos
            estágios de seus educandos;
          </li>
          <li>
            Comunicar à parte concedente do estágio, no início do período
            letivo, as datas de realização de avaliações escolares ou
            acadêmicas.
          </li>
        </ol>
        <p>
          <b>CLÁUSULA 8ª - INTERRUPÇÃO DA VIGÊNCIA</b>
        </p>
        <p>A interrupção da vigência ocorrerá por:</p>
        <ol type='a' className={styles.ol}>
          <li>Não cumprimento do convencionado neste TCE;</li>
          <li>
            Colação de grau de nível superior, reprovação, abandono ou mudança
            de curso ou trancamento de matrícula pelo ESTAGIÁRIO;
          </li>
          <li>Interrupção de vigência do TCE com a UNIPAMPA;</li>
          <li>Abandono do estágio;</li>
          <li>
            Pedido de substituição do ESTAGIÁRIO, por parte da UNIDADE
            CONCEDENTE do estágio;
          </li>
          <li>Manifestação, por escrito, de qualquer das partes.</li>
        </ol>
        <p>
          <b>CLÁUSULA 9ª - FORO</b>
        </p>
        <p className={styles.p}>
          As partes elegem o foro de Bagé/RS, com expressa renúncia de outro,
          por mais privilegiado que seja, para dirimir qualquer questão
          emergente do presente TCE.
        </p>
        <p className={styles.p}>
          E por estarem de comum acordo com as condições do TCE, as partes o
          assinam em 04 vias de igual teor.
        </p>
        <p style={{ textAlign: 'right' }}>( ), ( ), de ( ) de 20</p>
        <div className={styles.signatures}>
          <p style={{ lineHeight: '1.7rem', margin: 'auto' }}>
            _____________________
            <br />
            UNIDADE CONCEDENTE
          </p>
          <p style={{ lineHeight: '1.7rem', margin: 'auto' }}>
            _____________________
            <br />
            UNIPAMPA
          </p>
        </div>
        <div style={{ display: 'flex', textAlign: 'center' }}>
          <p style={{ lineHeight: '1.7rem', margin: 'auto' }}>
            _____________________
            <br />
            ESTAGIÁRIO
          </p>
        </div>
        <div style={{ textAlign: 'center', marginTop: '5rem' }}>
          <p>
            <b>PLANO DE ATIVIDADES DO ESTAGIÁRIO</b>
          </p>
          <p>
            <b>Vigência de ( ) até ( ) </b>
          </p>
          <b>ESTAGIÁRIO</b>
          <table className={styles.tg}>
            <tbody>
              <tr>
                <td className={styles['tg-73oq']} colSpan={2}>
                  Nome: {estagiario.nome}
                </td>
                <td className={styles['tg-73oq']} colSpan={2}>
                  Email: {estagiario.email}
                </td>
              </tr>
              <tr>
                <td className={styles['tg-73oq']} colSpan={2}>
                  Endereço: {estagiario.endereco}
                </td>
                <td className={styles['tg-73oq']}>
                  Bairro: {estagiario.bairro}
                </td>
                <td className={styles['tg-73oq']}>CEP: {estagiario.cep}</td>
              </tr>
              <tr>
                <td className={styles['tg-73oq']}>
                  Cidade: {estagiario.cidade}
                </td>
                <td className={styles['tg-73oq']}>UF: {estagiario.uf}</td>
                <td className={styles['tg-73oq']} colSpan={2}>
                  Telefone: {estagiario.telefone}
                </td>
              </tr>
              <tr>
                <td className={styles['tg-73oq']} colSpan={2}>
                  RG: {estagiario.rg}
                </td>
                <td className={styles['tg-73oq']} colSpan={2}>
                  CPF: {estagiario.cpf}
                </td>
              </tr>
              <tr>
                <td className={styles['tg-73oq']} colSpan={2}>
                  Semestre: {estagiario.semestre}
                </td>
                <td className={styles['tg-73oq']} colSpan={2}>
                  Curso: {estagiario.curso}
                </td>
              </tr>
              <tr>
                <td className={styles['tg-73oq']} colSpan={2}>
                  Campus: {(estagiario.campus as Campus).cidade}
                </td>
                <td className={styles['tg-73oq']} colSpan={2}>
                  Matrícula Nº: {estagiario.matricula}
                </td>
              </tr>
              <tr>
                <td className={styles['tg-73oq']} colSpan={4}>
                  Estágio curricular:{' '}
                  {estagiario.estagioObrigatorio
                    ? 'Obrigatório'
                    : 'Não obrigatório'}
                </td>
              </tr>
            </tbody>
          </table>
          <b>UNIDADE CONCEDENTE</b>
          <table className={styles.tg}>
            <tbody>
              <tr>
                <td className={styles['tg-73oq']} colSpan={4}>
                  Razão social: {unidadeConcedente.razaoSocial}
                </td>
              </tr>
              <tr>
                <td className={styles['tg-73oq']} colSpan={2}>
                  Endereço: {unidadeConcedente.endereco}
                </td>
                <td className={styles['tg-73oq']}>
                  Bairro: {unidadeConcedente.bairro}
                </td>
                <td className={styles['tg-73oq']}>
                  CEP:{unidadeConcedente.cep}
                </td>
              </tr>
              <tr>
                <td className={styles['tg-73oq']}>
                  Cidade: {unidadeConcedente.cidade}
                </td>
                <td className={styles['tg-73oq']}>
                  UF: {unidadeConcedente.uf}
                </td>
                <td className={styles['tg-73oq']} colSpan={2}>
                  Telefone: {unidadeConcedente.telefone}
                </td>
              </tr>
              <tr>
                <td className={styles['tg-73oq']} colSpan={2}>
                  CNPJ: {unidadeConcedente.cnpj}
                </td>
                <td className={styles['tg-73oq']} colSpan={2}>
                  Ramo de atividade: {unidadeConcedente.ramoDeAtividade}
                </td>
              </tr>
              <tr>
                <td className={styles['tg-73oq']} colSpan={2}>
                  Representante Legal: {unidadeConcedente.representanteLegal}
                </td>
                <td className={styles['tg-73oq']} colSpan={2}>
                  Cargo: {unidadeConcedente.cargoRepresentante}
                </td>
              </tr>
              <tr>
                <td className={styles['tg-73oq']} colSpan={2}>
                  Supervisor Estágio: {unidadeConcedente.supervisorEstagio}
                </td>
                <td className={styles['tg-73oq']} colSpan={2}>
                  Cargo: {unidadeConcedente.cargoSupervisor}
                </td>
              </tr>
            </tbody>
          </table>
          <b>INSTITUIÇÃO DE ENSINO</b>
          <table className={styles.tg}>
            <tbody>
              <tr>
                <td className={styles['tg-73oq']} colSpan={2}>
                  Razão social: {instituicao.razaoSocial}
                </td>
                <td className={styles['tg-73oq']} colSpan={2}>
                  Campus: {(instituicao.campus as Campus).cidade}
                </td>
              </tr>
              <tr>
                <td className={styles['tg-73oq']} colSpan={2}>
                  Endereço: {instituicao.endereco}
                </td>
                <td className={styles['tg-73oq']}>
                  Bairro: {instituicao.bairro}
                </td>
                <td className={styles['tg-73oq']}>CEP: {instituicao.cep}</td>
              </tr>
              <tr>
                <td className={styles['tg-73oq']}>
                  Cidade: {instituicao.cidade}
                </td>
                <td className={styles['tg-73oq']}>UF: {instituicao.uf}</td>
                <td className={styles['tg-73oq']} colSpan={2}>
                  Telefone: {instituicao.telefone}
                </td>
              </tr>
              <tr>
                <td className={styles['tg-73oq']} colSpan={4}>
                  CNPJ: {instituicao.cnpj}
                </td>
              </tr>
              <tr>
                <td className={styles['tg-73oq']} colSpan={2}>
                  Representante Legal: {instituicao.representanteLegal}
                </td>
                <td className={styles['tg-73oq']} colSpan={2}>
                  Cargo: {instituicao.cargoRepresentante}
                </td>
              </tr>
              <tr>
                <td className={styles['tg-73oq']} colSpan={4}>
                  Orientador Estágio: {instituicao.orientadorEstagio}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <b>Atividades que serão desenvolvidas pelo estagiário:</b>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <p style={{ textAlign: 'right' }}>( ), ( ), de ( ) de 20</p>
        <div
          style={{
            display: 'flex',
            textAlign: 'center',
            marginBottom: '2rem',
          }}
        >
          <p style={{ lineHeight: '1.7rem', margin: 'auto' }}>
            _____________________
            <br />
            UNIDADE CONCEDENTE
          </p>
          <p style={{ lineHeight: '1.7rem', margin: 'auto' }}>
            _____________________
            <br />
            UNIPAMPA
          </p>
        </div>
        <div style={{ display: 'flex', textAlign: 'center' }}>
          <p style={{ lineHeight: '1.7rem', margin: 'auto' }}>
            _____________________
            <br />
            ESTAGIÁRIO
          </p>
        </div>
      </div>
    </div>
  );
};
