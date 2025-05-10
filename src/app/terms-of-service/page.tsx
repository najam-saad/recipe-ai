"use client";

import { Gavel, FileSignature, AlertTriangle } from 'lucide-react';

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8">
      <header className="text-center py-10">
        <FileSignature className="w-20 h-20 text-primary mx-auto mb-6" />
        <h1 className="text-4xl sm:text-5xl font-bold mb-3">Terms of Service</h1>
        <p className="text-lg text-muted-foreground">Last Updated: {new Date().toLocaleDateString()}</p>
      </header>

      <article className="prose prose-lg max-w-4xl mx-auto bg-card p-6 sm:p-8 rounded-xl shadow-lg">
        <p>
          Welcome to RecipeSage! These Terms of Service ("Terms") govern your use of our website, mobile applications, and services (collectively, the "Service"), operated by RecipeSage ("us", "we", or "our"). Please read these Terms carefully before using our Service.
        </p>

        <h2 id="acceptance">
          <Gavel className="inline-block w-6 h-6 mr-2 text-primary align-middle" />
          Acceptance of Terms
        </h2>
        <p>
          By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
        </p>

        <h2 id="use-service">Use of Our Service</h2>
        <p>
          RecipeSage grants you a non-exclusive, non-transferable, revocable license to use the Service for your personal, non-commercial use, subject to these Terms.
        </p>
        <p>You agree not to use the Service:</p>
        <ul>
          <li>In any way that violates any applicable national or international law or regulation.</li>
          <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way.</li>
          <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail," "chain letter," "spam," or any other similar solicitation.</li>
          <li>To impersonate or attempt to impersonate RecipeSage, a RecipeSage employee, another user, or any other person or entity.</li>
        </ul>

        <h2 id="user-accounts">User Accounts</h2>
        <p>
          When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
        </p>
        <p>
          You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.
        </p>

        <h2 id="intellectual-property">Intellectual Property</h2>
        <p>
          The Service and its original content (excluding Content provided by users), features, and functionality are and will remain the exclusive property of RecipeSage and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.
        </p>
        
        <h2 id="user-content">User Content</h2>
        <p>
          Our Service may allow you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post on or through the Service, including its legality, reliability, and appropriateness.
        </p>
        <p>
          By posting Content on or through the Service, You represent and warrant that: (i) the Content is yours (you own it) and/or you have the right to use it and the right to grant us the rights and license as provided in these Terms, and (ii) that the posting of your Content on or through the Service does not violate the privacy rights, publicity rights, copyrights, contract rights or any other rights of any person or entity.
        </p>

        <h2 id="termination">Termination</h2>
        <p>
          We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
        </p>

        <h2 id="disclaimer">
            <AlertTriangle className="inline-block w-6 h-6 mr-2 text-destructive align-middle" />
            Disclaimer of Warranties; Limitation of Liability
        </h2>
        <p>
          The Service is provided on an "AS IS" and "AS AVAILABLE" basis. RecipeSage makes no representations or warranties of any kind, express or implied, as to the operation of their services, or the information, content or materials included therein. You expressly agree that your use of these services, their content, and any services or items obtained from us is at your sole risk.
        </p>
        <p>
            Nutritional information, recipe outcomes, and other data provided by the service are for informational purposes only. RecipeSage does not guarantee the accuracy of this information and is not liable for any decisions made based on it. Always consult with a qualified professional for dietary advice.
        </p>

        <h2 id="governing-law">Governing Law</h2>
        <p>
          These Terms shall be governed and construed in accordance with the laws of the State of [Your State/Country, e.g., California], United States, without regard to its conflict of law provisions.
        </p>

        <h2 id="changes-terms">Changes to Terms</h2>
        <p>
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
        </p>

        <h2 id="contact">Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us at legal@recipesage.com.
        </p>
      </article>
    </div>
  );
}
