import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function CookiePolicy() {
  return (
    <>
      <Navbar />
      <main className="flex-grow pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-serif font-bold text-primary mb-8">Política de Cookies</h1>
          
          <div className="prose prose-lg max-w-none text-primary/80">
            <p className="text-sm text-primary/60 mb-8">Última atualização: {new Date().toLocaleDateString('pt-PT')}</p>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-primary mb-4">1. O que são Cookies?</h2>
              <p>
                Cookies são pequenos ficheiros de texto que são armazenados no seu dispositivo (computador, telemóvel ou tablet) 
                quando visita um website. Eles permitem que o site reconheça o seu dispositivo e recordem certas informações 
                sobre a sua visita.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-primary mb-4">2. Como Usamos Cookies</h2>
              <p>A Miriam Mall utiliza cookies para os seguintes fins:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Cookies Essenciais:</strong> Necessários para o funcionamento básico do site</li>
                <li><strong>Cookies de Desempenho:</strong> Ajudam-nos a entender como os visitantes usam o site</li>
                <li><strong>Cookies de Funcionalidade:</strong> Recordam as suas preferências e escolhas</li>
                <li><strong>Cookies de Marketing:</strong> Usados para personalizar anúncios e conteúdo</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-primary mb-4">3. Tipos de Cookies Utilizados</h2>
              
              <h3 className="text-xl font-semibold text-primary mb-2">3.1 Cookies Essenciais</h3>
              <p>Estes cookies são necessários para que o site funcione corretamente:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Autenticação de sessão</li>
                <li>Segurança do site</li>
                <li>Gerenciamento de carrinho de compras (se aplicável)</li>
                <li>Manutenção de preferências de idioma</li>
              </ul>

              <h3 className="text-xl font-semibold text-primary mb-2 mt-4">3.2 Cookies de Desempenho</h3>
              <p>Estes cookies recolhem informações sobre como os visitantes usam o site:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Páginas mais visitadas</li>
                <li>Tempo gasto no site</li>
                <li>Taxa de rejeição</li>
                <li>Fonte de tráfego</li>
              </ul>

              <h3 className="text-xl font-semibold text-primary mb-2 mt-4">3.3 Cookies de Funcionalidade</h3>
              <p>Estes cookies recordam as suas escolhas para melhorar a sua experiência:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Preferências de tema (claro/escuro)</li>
                <li>Configurações de idioma</li>
                <li>Itens visualizados recentemente</li>
                <li>Formulários preenchidos</li>
              </ul>

              <h3 className="text-xl font-semibold text-primary mb-2 mt-4">3.4 Cookies de Marketing</h3>
              <p>Estes cookies são usados para personalizar a sua experiência:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Anúncios personalizados</li>
                <li>Recomendações de conteúdo</li>
                <li>Acompanhamento de conversões</li>
                <li>Análise de campanhas</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-primary mb-4">4. Cookies de Terceiros</h2>
              <p>
                Podemos permitir que terceiros coloquem cookies no seu dispositivo para os fins descritos acima. 
                Estes terceiros incluem:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Google Analytics:</strong> Para análise de tráfego e comportamento do utilizador</li>
                <li><strong>Redes Sociais:</strong> Para partilha e integração social</li>
                <li><strong>Serviços de Publicidade:</strong> Para exibir anúncios relevantes</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-primary mb-4">5. Gerenciar Cookies</h2>
              <h3 className="text-xl font-semibold text-primary mb-2">5.1 Configurações do Navegador</h3>
              <p>
                Você pode gerenciar cookies através das configurações do seu navegador. A maioria dos navegadores 
                permite que você:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Ver quais cookies estão armazenados</li>
                <li>Apagar cookies existentes</li>
                <li>Bloquear cookies de terceiros</li>
                <li>Desativar todos os cookies</li>
              </ul>
              <p className="mt-4">
                <strong>Nota:</strong> Desativar cookies essenciais pode afetar o funcionamento do site.
              </p>

              <h3 className="text-xl font-semibold text-primary mb-2 mt-4">5.2 Consentimento</h3>
              <p>
                Ao continuar a usar o nosso site, você consente com o uso de cookies conforme descrito nesta política. 
                Você pode retirar o seu consentimento a qualquer momento alterando as configurações do seu navegador.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-primary mb-4">6. Atualizações da Política</h2>
              <p>
                Podemos atualizar esta política de cookies periodicamente para refletir mudanças nos nossos 
                práticas ou por motivos legais. Recomendamos que reveja esta política regularmente.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-primary mb-4">7. Mais Informações</h2>
              <p>Para mais informações sobre cookies e privacidade, consulte:</p>
              <ul className="list-none space-y-2">
                <li><a href="/politica-de-privacidade" className="text-green hover:underline">Política de Privacidade</a></li>
                <li><a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-green hover:underline">www.allaboutcookies.org</a></li>
                <li><a href="https://www.youronlinechoices.eu" target="_blank" rel="noopener noreferrer" className="text-green hover:underline">www.youronlinechoices.eu</a></li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-primary mb-4">8. Contacto</h2>
              <p>
                Se tiver alguma questão sobre esta política de cookies, contacte-nos através:
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
