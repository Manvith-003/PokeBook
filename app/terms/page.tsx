import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service and End User License Agreement for PokéBook.',
};

export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 prose prose-neutral dark:prose-invert">
      <h1 className="text-4xl font-bold tracking-tight mb-4">Terms of Service</h1>
      <p className="text-sm text-muted-foreground mb-10">Last Updated: {new Date().toLocaleDateString()}</p>

      <div className="leading-relaxed space-y-6">
        <h2 className="text-2xl font-semibold mt-10 mb-4">1. Terms</h2>
        <p>
          By accessing the website at PokéBook, you are agreeing to be bound by these terms of service, all applicable laws and regulations, 
          and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, 
          you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">2. Use License</h2>
        <p>
          Permission is granted to temporarily download one copy of the materials (information or software) on PokéBook's website for personal, 
          non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
        </p>
        <ul>
          <li>modify or copy the materials (excluding open-source code repositories explicitly licensed otherwise);</li>
          <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
          <li>attempt to decompile or reverse engineer any software contained on PokéBook's website;</li>
          <li>remove any copyright or other proprietary notations from the materials; or</li>
          <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
        </ul>
        <p>
          This license shall automatically terminate if you violate any of these restrictions and may be terminated by PokéBook at any time. 
          Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials 
          in your possession whether in electronic or printed format.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">3. Disclaimer</h2>
        <p>
          The materials on PokéBook's website are provided on an 'as is' basis. PokéBook makes no warranties, expressed or implied, 
          and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, 
          fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
        </p>
        <p>
          Further, PokéBook does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use 
          of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">4. Limitations</h2>
        <p>
          In no event shall PokéBook or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, 
          or due to business interruption) arising out of the use or inability to use the materials on PokéBook's website, even if PokéBook 
          or a PokéBook authorized representative has been notified orally or in writing of the possibility of such damage. 
          Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, 
          these limitations may not apply to you.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">5. Accuracy of Materials</h2>
        <p>
          The materials appearing on PokéBook's website could include technical, typographical, or photographic errors. 
          PokéBook does not warrant that any of the materials on its website are accurate, complete or current. PokéBook may make changes 
          to the materials contained on its website at any time without notice. However PokéBook does not make any commitment to update the materials.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">6. Links</h2>
        <p>
          PokéBook has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. 
          The inclusion of any link does not imply endorsement by PokéBook of the site. Use of any such linked website is at the user's own risk.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">7. Modifications</h2>
        <p>
          PokéBook may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound 
          by the then current version of these terms of service.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">8. Governing Law</h2>
        <p>
          These terms and conditions are governed by and construed in accordance with standard international laws and you irrevocably submit 
          to the exclusive jurisdiction of the courts in your state or location.
        </p>
      </div>
    </div>
  );
}
