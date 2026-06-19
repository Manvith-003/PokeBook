import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Comprehensive Privacy Policy for PokéBook users.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 prose prose-neutral dark:prose-invert">
      <h1 className="text-4xl font-bold tracking-tight mb-4">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground mb-10">Last Updated and Effective Date: {new Date().toLocaleDateString()}</p>

      <div className="leading-relaxed space-y-6">
        <p>
          At PokéBook, accessible from our official website domains, one of our main priorities is the privacy of our visitors. 
          This Privacy Policy document contains types of information that is collected and recorded by PokéBook and how we use it.
        </p>
        <p>
          If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">1. Information We Collect</h2>
        <p>
          PokéBook is designed primarily as a static encyclopedia. We do not require you to create an account, nor do we mandate 
          the provision of personal identifiable information (PII) to use the core features of the site.
        </p>
        <p>
          <strong>Information collected automatically:</strong> When you visit the website, our servers automatically record information 
          that your browser sends. This may include your IP address, browser type and version, the pages of our Service that you visit, 
          the time and date of your visit, the time spent on those pages, and other standard diagnostic data.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">2. Local Storage and Cookies</h2>
        <p>
          To enhance your user experience, PokéBook utilizes local browser storage (such as localStorage or IndexedDB) to save your 
          preferences, such as UI theme settings (dark/light mode) and any Pokémon you mark as 'Favorites'. This data remains on your 
          device and is <strong>never transmitted to our servers</strong>.
        </p>
        <p>
          We may also use standard "cookies" for basic analytics and site performance monitoring. You can choose to disable cookies 
          through your individual browser options.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">3. Third-Party Services and APIs</h2>
        <p>
          PokéBook heavily relies on third-party services to function:
        </p>
        <ul>
          <li><strong>PokéAPI:</strong> We fetch Pokémon data from PokéAPI. When your browser requests this data, your IP address is exposed to their servers.</li>
          <li><strong>Image Hosting:</strong> Pokémon sprites and artwork may be hosted on third-party Content Delivery Networks (CDNs). Accessing these images acts as a direct request from your browser to those servers.</li>
          <li><strong>Analytics:</strong> We may use privacy-respecting analytics tools to measure website traffic. These tools aggregate data and do not profile individual users.</li>
        </ul>
        <p>
          We strongly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">4. How We Use Your Information</h2>
        <p>
          The limited diagnostic data we collect is used in various ways, including to:
        </p>
        <ul>
          <li>Provide, operate, and maintain our website</li>
          <li>Improve, personalize, and expand our website performance</li>
          <li>Understand and analyze how you use our website</li>
          <li>Develop new features, functionality, and user interfaces</li>
          <li>Find and prevent critical bugs or security vulnerabilities</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-4">5. Children's Information</h2>
        <p>
          Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians 
          to observe, participate in, and/or monitor and guide their online activity.
        </p>
        <p>
          PokéBook does not knowingly collect any Personal Identifiable Information from children under the age of 13. 
          If you think that your child provided this kind of information on our website, we strongly encourage you to contact us 
          immediately and we will do our best efforts to promptly remove such information from our records.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">6. Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. Thus, we advise you to review this page periodically for any changes. 
          We will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately, 
          after they are posted on this page.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">7. Contact Us</h2>
        <p>
          If you have any questions or suggestions about our Privacy Policy, do not hesitate to reach out via our official Contact Us page.
        </p>
      </div>
    </div>
  );
}
