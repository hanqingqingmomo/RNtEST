// @flow

import React, { Component } from 'react';

import { DeferExpensiveTasks, View, Screen } from '../atoms';
import { HelpBlock } from '../blocks';

const PRIVACY = [
  {
    title: 'Privacy Policy',
    text: [
      "This privacy policy has been compiled to better serve those who are concerned with how their 'Personally Identifiable Information' (PII) is being used online. PII, as described in US privacy law and information security, is information that can be used on its own or with other information to identify, contact, or locate a single person, or to identify an individual in context. Please read our privacy policy carefully to get a clear understanding of how we collect, use, protect or otherwise handle your Personally Identifiable Information in accordance with our website.",
    ],
  },
  {
    title:
      'What personal information do we collect from the people that visit our blog, website or app?',
    text: [
      'When ordering or registering on our site, as appropriate, you may be asked to enter your name, email address, phone number, credit card information or other details to help you with your experience.',
    ],
  },
  {
    title: 'When do we collect information?',
    text: [
      'We collect information from you when you register on our site or enter information on our site.',
    ],
  },
  {
    title: 'How do we use your information?',
    text: [
      'We may use the information we collect from you when you register, make a purchase, sign up for our newsletter, respond to a survey or marketing communication, surf the website, or use certain other site features in the following ways:',
      {
        list: [
          'To improve our website in order to better serve you.',
          'To allow us to better service you in responding to your customer service requests.',
          'To administer a contest, promotion, survey or other site feature.',
          'To quickly process your transactions.',
          'To send periodic emails regarding your order or other products and services.',
        ],
      },
    ],
  },
  {
    title: 'How do we protect your information?',
    text: [
      'Our website is scanned on a regular basis for security holes and known vulnerabilities in order to make your visit to our site as safe as possible.',
      'We use regular Malware Scanning.',
      'Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential. In addition, all sensitive/credit information you supply is encrypted via Secure Socket Layer (SSL) technology.',
      'We implement a variety of security measures when a user enters, submits, or accesses their information to maintain the safety of your personal information.',
      'All transactions are processed through a gateway provider and are not stored or processed on our servers.',
    ],
  },
  {
    title: "Do we use 'cookies'?",
    text: [
      "Yes. Cookies are small files that a site or its service provider transfers to your computer's hard drive through your Web browser (if you allow) that enables the site's or service provider's systems to recognize your browser and capture and remember certain information. For instance, we use cookies to help us remember and process the items in your shopping cart. They are also used to help us understand your preferences based on previous or current site activity, which enables us to provide you with improved services. We also use cookies to help us compile aggregate data about site traffic and site interaction so that we can offer better site experiences and tools in the future.",
    ],
  },
  {
    title: 'We use cookies to:',
    text: [
      'Compile aggregate data about site traffic and site interactions in order to offer better site experiences and tools in the future. We may also use trusted third-party services that track this information on our behalf.',
      "You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies. You do this through your browser settings. Since browser is a little different, look at your browser's Help Menu to learn the correct way to modify your cookies.'",
      "If you turn cookies off, Some of the features that make your site experience more efficient may not function properly.It won't affect the user's experience that make your site experience more efficient and may not function properly.",
    ],
  },
  {
    title: 'Third-party disclosure',
    text: [
      "We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential. We may also release information when it's release is appropriate to comply with the law, enforce our site policies, or protect ours or others' rights, property or safety.",
      'However, non-personally identifiable visitor information may be provided to other parties for marketing, advertising, or other uses.',
    ],
  },
  {
    title: 'Third-party links',
    text: [
      'We do not include or offer third-party products or services on our website.',
    ],
  },
  {
    title: 'Third-party links',
    text: [
      "Google's advertising requirements can be summed up by Google's Advertising Principles. They are put in place to provide a positive experience for users. https://support.google.com/adwordspolicy/answer/1316548?hl=en",
      'We have not enabled Google AdSense on our site but we may do so in the future.',
    ],
  },
  {
    title: 'Third-party links',
    text: [
      "CalOPPA is the first state law in the nation to require commercial websites and online services to post a privacy policy. The law's reach stretches well beyond California to require any person or company in the United States (and conceivably the world) that operates websites collecting Personally Identifiable Information from California consumers to post a conspicuous privacy policy on its website stating exactly the information being collected and those individuals or companies with whom it is being shared. - See more at: http://consumercal.org/california-online-privacy-protection-act-caloppa/#sthash.0FdRbT51.dpuf",
      'According to CalOPPA, we agree to the following:',
      'Users can visit our site anonymously.',
      'Once this privacy policy is created, we will add a link to it on our home page or as a minimum, on the first significant page after entering our website.',
      "Our Privacy Policy link includes the word 'Privacy' and can easily be found on the page specified above.",
      'You will be notified of any Privacy Policy changes:',
      { list: ['On our Privacy Policy Page'] },
      'Can change your personal information:',
      { list: ['By logging in to your account'] },
    ],
  },
  {
    title: 'How does our site handle Do Not Track signals?',
    text: [
      'We honor Do Not Track signals and Do Not Track, plant cookies, or use advertising when a Do Not Track (DNT) browser mechanism is in place.',
      'Does our site allow third-party behavioral tracking?',
      "It's also important to note that we do not allow third-party behavioral tracking",
    ],
  },
  {
    title: 'COPPA (Children Online Privacy Protection Act)',
    text: [
      "When it comes to the collection of personal information from children under the age of 13 years old, the Children's Online Privacy Protection Act (COPPA) puts parents in control. The Federal Trade Commission, United States' consumer protection agency, enforces the COPPA Rule, which spells out what operators of websites and online services must do to protect children's privacy and safety online.",
      'We do not specifically market to children under the age of 13 years old.',
    ],
  },
  {
    title:
      'Do we let third-parties, including ad networks or plug-ins collect PII from children under 13?',
    text: [
      'Fair Information Practices',
      'The Fair Information Practices Principles form the backbone of privacy law in the United States and the concepts they include have played a significant role in the development of data protection laws around the globe. Understanding the Fair Information Practice Principles and how they should be implemented is critical to comply with the various privacy laws that protect personal information.',
      'In order to be in line with Fair Information Practices we will take the following responsive action, should a data breach occur:',
      'We will notify you via email',
      { list: ['Within 7 business days'] },
      'We also agree to the Individual Redress Principle which requires that individuals have the right to legally pursue enforceable rights against data collectors and processors who fail to adhere to the law. This principle requires not only that individuals have enforceable rights against data users, but also that individuals have recourse to courts or government agencies to investigate and/or prosecute non-compliance by data processors.',
    ],
  },
];

export default class PrivacyScreen extends Component<{}> {
  static navigationOptions = {
    headerTitle: 'Privacy Policy',
  };

  render() {
    return (
      <DeferExpensiveTasks>
        <Screen>
          <View>
            {PRIVACY.map((bag, idx) => <HelpBlock key={idx} {...bag} />)}
          </View>
        </Screen>
      </DeferExpensiveTasks>
    );
  }
}
