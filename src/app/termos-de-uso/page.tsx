import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function TermsOfUse() {
  return (
    <>
      <Navbar />
      <main className="flex-grow pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-serif font-bold text-primary mb-8">Termos de Uso</h1>
          
          <div className="prose prose-lg max-w-none text-primary/80">
            <p className="text-sm text-primary/60 mb-8">Última atualização: {new Date().toLocaleDateString('pt-PT')}</p>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-primary mb-4">1. Aceitação dos Termos</h2>
              <p>
                Ao aceder e usar o website da Miriam Mall, você aceita e concorda em ficar vinculado por estes Termos de Uso 
                e todas as leis e regulamentos aplicáveis. Se não concordar com estes termos, está proibido de usar este site.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-primary mb-4">2. Uso do Website</h2>
              <h3 className="text-xl font-semibold text-primary mb-2">2.1 Permissão de Uso</h3>
              <p>
                É concedida permissão para usar temporariamente este site para fins pessoais e comerciais, 
                sujeito a estes termos. O uso não autorizado deste site pode resultar em ação legal.
              </p>

              <h3 className="text-xl font-semibold text-primary mb-2 mt-4">2.2 Restrições</h3>
              <p>Você concorda em não:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Usar o site para qualquer propósito ilegal ou não autorizado</li>
                <li>Copiar, modificar ou distribuir qualquer conteúdo do site</li>
                <li>Tentar obter acesso não autorizado ao sistema ou servidor</li>
                <li>Interferir com o funcionamento do site</li>
                <li>Usar o site para transmitir vírus ou código malicioso</li>
                <li>Coletar dados pessoais de outros utilizadores</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-primary mb-4">3. Propriedade Intelectual</h2>
              <p>
                Todo o conteúdo deste site, incluindo textos, imagens, logótipos, gráficos e software, é propriedade 
                da Miriam Mall ou dos seus licenciadores e está protegido por leis de direitos de autor e outras 
                leis de propriedade intelectual.
              </p>
              <p className="mt-4">
                Você não tem permissão para usar qualquer conteúdo do site para fins comerciais sem o consentimento 
                prévio por escrito da Miriam Mall.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-primary mb-4">4. Informações e Conteúdo</h2>
              <h3 className="text-xl font-semibold text-primary mb-2">4.1 Precisão das Informações</h3>
              <p>
                Embora nos esforcemos para manter as informações neste site precisas e atualizadas, não garantimos 
                a precisão, completez ou atualidade das informações. O uso de qualquer informação deste site é por sua 
                conta e risco.
              </p>

              <h3 className="text-xl font-semibold text-primary mb-2 mt-4">4.2 Disponibilidade</h3>
              <p>
                Não garantimos que o site estará disponível ininterruptamente. Podemos suspender, restringir ou 
                interromper o acesso ao site a qualquer momento sem aviso prévio.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-primary mb-4">5. Submissões de Conteúdo</h2>
              <p>
                Ao submeter qualquer conteúdo ao site (como formulários de contacto, pedidos de arrendamento), 
                você garante que:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>É o proprietário do conteúdo ou tem permissão para o usar</li>
                <li>O conteúdo não viola direitos de terceiros</li>
                <li>O conteúdo não é ilegal, ofensivo ou difamatório</li>
              </ul>
              <p className="mt-4">
                Você concede à Miriam Mall uma licença não exclusiva para usar, reproduzir e exibir o conteúdo 
                submetido para os fins descritos.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-primary mb-4">6. Limitação de Responsabilidade</h2>
              <p>
                Em nenhuma circunstância a Miriam Mall será responsável por quaisquer danos diretos, indiretos, 
                incidentais, especiais ou consequenciais resultantes do uso ou incapacidade de usar este site.
              </p>
              <p className="mt-4">
                Esta limitação aplica-se a todos os danos, incluindo mas não limitados a: perda de dados, lucros 
                cessantes, danos ao equipamento ou software, ou qualquer outro dano pecuniário.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-primary mb-4">7. Indemnização</h2>
              <p>
                Você concorda em indemnizar e manter a Miriam Mall, seus diretores, funcionários e parceiros 
                isentos de quaisquer reivindicações, danos, responsabilidades, custos e despesas resultantes 
                do seu uso deste site ou violação destes termos.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-primary mb-4">8. Alterações aos Termos</h2>
              <p>
                Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entrarão 
                em vigor imediatamente após a publicação no site. É sua responsabilidade rever estes termos 
                regularmente.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-primary mb-4">9. Lei Aplicável</h2>
              <p>
                Estes termos são regidos e interpretados de acordo com as leis da República de Moçambique. 
                Quaisquer disputas serão resolvidas nos tribunais competentes de Moçambique.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-primary mb-4">10. Contacto</h2>
              <p>
                Se tiver alguma questão sobre estes Termos de Uso, contacte-nos através:
              </p>
              <ul className="list-none space-y-2">
                <li><strong>E-mail:</strong> info@miriammall.co.mz</li>
                <li><strong>Telefone:</strong> +258 86 554 3026</li>
                <li><strong>Endereço:</strong> Miriam Mall, Distrito de Homoíne, Província de Inhambane, Moçambique</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
