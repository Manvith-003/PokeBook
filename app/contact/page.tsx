import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the PokéBook support and development team.',
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 prose prose-neutral dark:prose-invert">
      <h1 className="text-4xl font-bold tracking-tight mb-8">Contact Us</h1>
      
      <p className="text-lg leading-relaxed mb-8">
        We are always eager to hear from the community. Whether you have discovered a data inaccuracy, 
        wish to request a new feature, have a media inquiry, or simply want to share your experience 
        using PokéBook, our team is here to listen.
      </p>

      <div className="grid md:grid-cols-2 gap-12 mb-12">
        <div>
          <h2 className="text-2xl font-semibold mb-6">How Can We Help?</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg m-0">General Inquiries</h3>
              <p className="text-muted-foreground m-0 mt-1">For general questions about our platform and how to use it.</p>
              <a href="mailto:info@pokebook.example.com" className="text-primary hover:underline">info@pokebook.example.com</a>
            </div>
            <div>
              <h3 className="font-semibold text-lg m-0">Technical Support</h3>
              <p className="text-muted-foreground m-0 mt-1">Encountering bugs or performance issues? Let our engineering team know.</p>
              <a href="mailto:support@pokebook.example.com" className="text-primary hover:underline">support@pokebook.example.com</a>
            </div>
            <div>
              <h3 className="font-semibold text-lg m-0">Data Corrections</h3>
              <p className="text-muted-foreground m-0 mt-1">Spotted an error in Pokémon stats or abilities? Help us fix it.</p>
              <a href="mailto:data@pokebook.example.com" className="text-primary hover:underline">data@pokebook.example.com</a>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl p-8 border shadow-sm">
          <h2 className="text-2xl font-semibold mb-6 mt-0">Send a Message</h2>
          <form className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                className="w-full px-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary" 
                placeholder="Professor Oak"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                className="w-full px-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary" 
                placeholder="oak@pallettown.lab"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
              <select 
                id="subject" 
                name="subject" 
                className="w-full px-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="general">General Inquiry</option>
                <option value="support">Technical Support</option>
                <option value="data">Data Correction</option>
                <option value="feedback">Feedback & Suggestions</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
              <textarea 
                id="message" 
                name="message" 
                rows={4} 
                className="w-full px-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-y" 
                placeholder="Please describe your inquiry in detail..."
              ></textarea>
            </div>
            <button 
              type="button" 
              className="w-full px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity"
              onClick={() => alert("Thank you for your message! Our support team will get back to you shortly.")}
            >
              Submit Inquiry
            </button>
          </form>
        </div>
      </div>

      <div className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-4">Response Times</h2>
        <p className="leading-relaxed">
          Please note that PokéBook is maintained by a dedicated group of volunteers. While we strive to read every message we receive, 
          response times may vary depending on the volume of inquiries. Standard inquiries are typically addressed within 3-5 business days. 
          For immediate assistance with bugs, we recommend opening an issue on our public GitHub repository.
        </p>
      </div>
    </div>
  );
}
