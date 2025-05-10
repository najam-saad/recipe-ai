"use client";

import { ShieldCheck, FileText, Info } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8">
      <header className="text-center py-10">
        <ShieldCheck className="w-20 h-20 text-primary mx-auto mb-6" />
        <h1 className="text-4xl sm:text-5xl font-bold mb-3">Privacy Policy</h1>
        <p className="text-lg text-muted-foreground">Last Updated: {new Date().toLocaleDateString()}</p>
      </header>

      <article className="prose prose-lg max-w-4xl mx-auto bg-card p-6 sm:p-8 rounded-xl shadow-lg">
        <p>
          Welcome to RecipeSage! We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information, please contact us at privacy@recipesage.com.
        </p>

        <h2 id="what-info">
          <FileText className="inline-block w-6 h-6 mr-2 text-primary align-middle" />
          What Information Do We Collect?
        </h2>
        <p>
          We collect personal information that you voluntarily provide to us when you register on the RecipeSage, express an interest in obtaining information about us or our products and services, when you participate in activities on the RecipeSage (such as posting comments or entering competitions, promotions or surveys) or otherwise when you contact us.
        </p>
        <p>
          The personal information that we collect depends on the context of your interactions with us and the RecipeSage, the choices you make and the products and features you use. The personal information we collect may include the following:
        </p>
        <ul>
          <li><strong>Personal Information Provided by You.</strong> We collect names; email addresses; usernames; passwords; contact preferences; and other similar information.</li>
          <li><strong>Recipe Data.</strong> We collect information you provide related to recipes, such as ingredients, instructions, favorited recipes, and uploaded images.</li>
        </ul>

        <h2 id="how-info">
          <Info className="inline-block w-6 h-6 mr-2 text-primary align-middle" />
          How Do We Use Your Information?
        </h2>
        <p>
          We use personal information collected via our RecipeSage for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
        </p>
        <ul>
          <li>To facilitate account creation and logon process.</li>
          <li>To post testimonials.</li>
          <li>Request feedback.</li>
          <li>To manage user accounts.</li>
          <li>To send administrative information to you.</li>
          <li>To protect our Services.</li>
          <li>To respond to user inquiries/offer support to users.</li>
          <li>For other business purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our RecipeSage, products, marketing and your experience.</li>
        </ul>
        
        <h2 id="share-info">Will Your Information Be Shared With Anyone?</h2>
        <p>
          We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.
        </p>
        
        <h2 id="cookies">Do We Use Cookies and Other Tracking Technologies?</h2>
        <p>
          We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Policy (if applicable).
        </p>

        <h2 id="data-retention">How Long Do We Keep Your Information?</h2>
        <p>
          We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice, unless a longer retention period is required or permitted by law (such as tax, accounting or other legal requirements).
        </p>

        <h2 id="data-security">How Do We Keep Your Information Safe?</h2>
        <p>
          We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
        </p>
        
        <h2 id="minors">Do We Collect Information From Minors?</h2>
        <p>
          We do not knowingly solicit data from or market to children under 18 years of age.
        </p>

        <h2 id="privacy-rights">What Are Your Privacy Rights?</h2>
        <p>
          In some regions (like the EEA and UK), you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; and (iv) if applicable, to data portability.
        </p>
        
        <h2 id="updates">Updates to This Notice</h2>
        <p>
          We may update this privacy notice from time to time. The updated version will be indicated by an updated "Revised" date and the updated version will be effective as soon as it is accessible.
        </p>

        <h2 id="contact">How Can You Contact Us About This Notice?</h2>
        <p>
          If you have questions or comments about this notice, you may email us at privacy@recipesage.com or by post to:
        </p>
        <address className="not-prose">
          RecipeSage<br />
          Attn: Privacy Officer<br />
          123 Culinary Lane<br />
          Foodie City, FC 54321<br />
          United States
        </address>
      </article>
    </div>
  );
}
