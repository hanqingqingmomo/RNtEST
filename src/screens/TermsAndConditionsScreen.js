// @flow

import React, { Component } from 'react';
import { InteractionManager } from 'react-native';

import { DeferExpensiveTasks, View, Screen } from '../atoms';
import { HelpBlock } from '../blocks';

const TERMS = [
  {
    title: 'The Short of It',
    text: [
      'The Short of It The YWCA Metropolitan Chicago is dedicated to eliminating racism, empowering women and promoting peace, justice, freedom and dignity for all. This App is a single integrated collaboration platform that improves social impact by virtually delivering our core services and programs via live interactive web conferences and online communities that allow us to keep each instructional training session, support group discussion, and mentoring/coaching conversation going. We are transforming the way we deliver our services to increase the number and frequency of interactions with the people we serve; a proven best practice to improving the quality and results of our services. Likewise, this App will enhance our general communications, calls to actions, and collaborations with others.',
      'We created the App to make it easier for you to connect with the people you trust, that provide life-changing services/programs you need and use, and that share your passions and interests. We would love for you to use it. Our service is designed to give you as much control and ownership as possible over what you share and do on the YWCA Metropolitan Chicago App, and we encourage you to express yourself freely.',
      "However, be responsible in what you publish. In particular, make sure that none of the prohibited items listed below (like spam, viruses, or hate content) appear in any content that you share, or get linked to from your site. The YWCA Metropolitan Chicago App is committed to respectfully connecting others to exchange knowledge and ideas. YWCA Metropolitan Chicago App's members are what make it powerful. We're here to listen to feedback and make the product as useful as possible. It's your job to use YWCA Metropolitan Chicago App’s services responsibly.",
    ],
  },
  {
    title: 'The Long of It',
    text: [
      'The following terms and conditions govern all use of the YWCA Metropolitan Chicago App and all content, services and products available at or through the App, including the YWCA Metropolitan Chicago platform. The App is owned, operated and gifted by Powered by Action to the YWCA Metropolitan Chicago App.com, Inc. (“YWCA Metropolitan Chicago App”). The Services are offered subject to your acceptance without modification of all of the terms and conditions contained herein and all other operating rules, policies and procedures that may be published from time to time on this App by YWCA Metropolitan Chicago App (collectively, the “Agreement”).',
      'Please read this Agreement carefully before accessing or using the YWCA Metropolitan Chicago App Services. By accessing or using the YWCA Metropolitan Chicago App Services, you agree to become bound by the terms and conditions of this Agreement. If you do not agree to all the terms and conditions of this Agreement, then you may not access the App or use any of its services. These terms and conditions are considered an offer by the YWCA Metropolitan Chicago, acceptance is expressly limited to these terms. The YWCA Metropolitan Chicago App Services are available only to individuals who are at least 13 years of age or whose parents have provided a consent form approving its use.',
    ],
  },
  {
    title: 'Your YWCA Metropolitan Chicago and Application Account',
    text: [
      'If you create a YWCA Metropolitan Chicago App account, you are responsible for maintaining the security of your password, identification, and account, and you are fully responsible for all activities that occur under the account and any other actions taken in connection with the YWCA Metropolitan Chicago App Services.',
    ],
  },
  {
    title: 'Your YWCA Metropolitan Chicago Community and Conferences',
    text: [
      'If you create a community on YWCA Metropolitan Chicago App, you are responsible for all activities that occur in your community. If you host a web conference on YWCA Metropolitan Chicago App, you are responsible for all activities that occur in the web conference. In both cases, you must not describe or assign keywords to your community or web conference in a misleading or unlawful manner, including in a manner intended to trade on the name or reputation of others, and YWCA Metropolitan Chicago App may change or remove any description or keyword that it considers inappropriate or unlawful, or otherwise likely to cause YWCA Metropolitan Chicago App liability. You must immediately notify YWCA Metropolitan Chicago App of any unauthorized uses of your account, community, web conference or any other breaches of security. YWCA Metropolitan Chicago App will not be liable for any acts or omissions by you, including any damages of any kind incurred as a result of such acts or omissions.',
    ],
  },
  {
    title: 'Your Content and Conduct',
    text: [
      'If you participate in a community or web conference, post material to the App, post links on the App, or otherwise make (or allow any third party to make) material available by means of the App (any such material, “Content”), you are entirely responsible for the content of, and any harm resulting from, that Content. That is the case regardless of whether the Content in question constitutes text, graphics, an audio or video file, or computer software. By making Content available, you represent and warrant that:',
    ],
  },
  {
    title: 'Your Content and Conduct',
    text: [
      'If you participate in a community or web conference, post material to the App, post links on the App, or otherwise make (or allow any third party to make) material available by means of the App (any such material, “Content”), you are entirely responsible for the content of, and any harm resulting from, that Content. That is the case regardless of whether the Content in question constitutes text, graphics, an audio or video file, or computer software. By making Content available, you represent and warrant that:',
      {
        list: [
          'the downloading, copying and use of the Content does not infringe the proprietary rights, including but not limited to the copyright, patent, trademark or trade secret rights, of any third party;',
          'if your employer has rights to intellectual property you create, you have either (i) received permission from your employer to post or make available the Content, including but not limited to any software, or (ii) secured from your employer a waiver as to all rights in or to the Content;',
          'you have fully complied with any third-party licenses relating to the Content, and have done all things necessary to successfully pass through to end users any required terms;',
          'the Content does not contain or install any viruses, worms, malware, Trojan horses or other harmful, disruptive or destructive content;',
          'the Content is not spam, is not machine or randomly-generated, and does not contain unethical or unwanted commercial content designed to drive traffic to third party sites or boost the search engine rankings of third party sites, or to further unlawful acts (such as phishing) or mislead recipients as to the source of the material (such as spoofing);',
          'the Content is not pornographic, libelous or defamatory, does not contain threats or incite violence towards individuals or entities, and does not violate the privacy or publicity rights of any third party;',
          'your Content, community or web conference is not being advertised via unwanted electronic messages such as spam links on newsgroups, email lists, other blogs and web sites, and similar unsolicited promotional methods;',
          'your Content, community or web conference is not named in a manner that misleads your readers into thinking that you are another person or company. For example, your web conference URL or name is not the name of a person other than yourself or company other than your own;',
          'you have, in the case of Content that includes computer code, accurately categorized and/or described the type, nature, uses and effects of the materials, whether requested to do so by YWCA Metropolitan Chicago App or otherwise.',
        ],
      },
      "Without limiting any of those representations or warranties, YWCA Metropolitan Chicago App has the right (though not the obligation) to, in YWCA Metropolitan Chicago App’s sole discretion (i) refuse or remove any content that, in YWCA Metropolitan Chicago App's reasonable opinion, violates any YWCA Metropolitan Chicago App policy or is in any way harmful or objectionable, or (ii) terminate or deny access to and use of the App to any individual or entity for any reason, in YWCA Metropolitan Chicago App's sole discretion. YWCA Metropolitan Chicago App will have no obligation to provide a refund of any amounts previously paid. Failure to enforce such rules in some instances does not constitute a waiver of our right to enforce the rules in other instances. In addition, these rules do not create any private right of action on the part of any third party or any reasonable expectation that the App will not contain any content that is prohibited by such rules.",
      'Community Organizers (Administrators) also have the ability to remove members from their community at their own discretion. To do this, the Community Organizer needs to go to Community Settings > Members, and then select the option to remove a member.',
    ],
  },
  {
    title: 'User Provided Content - License',
    text: [
      'By submitting Content on YWCA Metropolitan Chicago App’s sites, within a community or web conference or otherwise, you grant YWCA Metropolitan Chicago App a world-wide, irrevocable, royalty-free, non-exclusive, perpetual and fully sub-licensable right to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display the Content in any media. In cases where the Content is public, YWCA Metropolitan Chicago App may use the Content, including recorded web conferences, discussions within communities, etc. to promote YWCA Metropolitan Chicago App, YWCA Metropolitan Chicago App communities and web conferences. In cases where the Content is private, YWCA Metropolitan Chicago App will make a reasonable effort to protect sensitive and confidential information. If you delete Content, YWCA Metropolitan Chicago App will use reasonable efforts to remove it from the App, but you acknowledge that caching or references to the Content may not be made immediately unavailable.',
      'By opting in to record a web conference or participate in a web conference that is being recorded, you grant a non-exclusive license to the web conference organizer and YWCA Metropolitan Chicago App to reproduce, modify, adapt and publish the Content.',
      'By opting in to share Content on third-party platforms and App, using features including (but not limited to) the upload to YouTube tool, share on Facebook tool, Twitter-embedded chat or embed video tool, you grant a non-exclusive license to publish the Content.',
      'YWCA Metropolitan Chicago App may use public and private communities’ names and logos as client references, including a general description of the services provided by YWCA Metropolitan Chicago App, in its resumes, case studies, and in other promotional information including, but not limited to, press releases, brochures, reports, letters, white papers, and electronic media such as email or Web pages.',
    ],
  },
  {
    title: 'Responsibility of App Visitors.',
    text: [
      'By operating the App, YWCA Metropolitan Chicago App does not represent or imply that it endorses the material there posted, or that it believes such material to be accurate, useful or non-harmful. You are responsible for taking precautions as are necessary to protect yourself and your computer systems from viruses, worms, Trojan horses, and other harmful or destructive content. In case App contains content that is offensive, indecent, or otherwise objectionable the users have an option to report any such case. App may contain technical inaccuracies, typographical mistakes, and other errors. The App may also contain material that violates the privacy or publicity rights, or infringes the intellectual property and other proprietary rights, of third parties, or the downloading, copying or use of which is subject to additional terms and conditions, stated or unstated. YWCA Metropolitan Chicago App disclaims any responsibility for any harm resulting from the use of the App by visitors of the App, or from any downloading by those visitors of content there posted.',
    ],
  },
  {
    title: 'Content Posted on Other App',
    text: [
      'We have not reviewed, and cannot review, all of the material, including computer software, made available through third-party App to which YWCA links, and that link to PoweredbyAction.com. YWCA Metropolitan Chicago App does not have any control over those non-YWCA Metropolitan Chicago App App and web pages, and is not responsible for their contents or their use. By linking to a non-YWCA Metropolitan Chicago App App or web page, YWCA Metropolitan Chicago App does not represent or imply that it endorses such App or web page. You are responsible for taking precautions as necessary to protect yourself and your computer systems from viruses, worms, Trojan horses, and other harmful or destructive content. YWCA Metropolitan Chicago App disclaims any responsibility for any harm resulting from your use of non-YWCA Metropolitan Chicago App Apps and web pages.',
    ],
  },
  {
    title: 'Copyright Infringement and DMCA Policy',
    text: [
      'As YWCA Metropolitan Chicago App asks others to respect its intellectual property rights, it respects the intellectual property rights of others. If you believe that material located on or linked to by YWCA violates your copyright, you are encouraged to notify YWCA Metropolitan Chicago App by emailing support@poweredbyaction.com. YWCA Metropolitan Chicago App will respond to all such notices, including as required or appropriate by removing the infringing material or disabling all links to the infringing material. In the case of a visitor who may infringe or repeatedly infringes the copyrights or other intellectual property rights of YWCA Metropolitan Chicago App or others, YWCA Metropolitan Chicago App may, in its discretion, terminate use of or deny access to any of the YWCA Metropolitan Chicago App Services. In the case of such termination, YWCA Metropolitan Chicago App will have no obligation to provide a refund of any amounts previously paid to YWCA Metropolitan Chicago App.',
    ],
  },
  {
    title: 'Intellectual Property',
    text: [
      'This Agreement does not transfer from YWCA Metropolitan Chicago App to you or any YWCA Metropolitan Chicago App or third party intellectual property, and all rights, title and interest in and to such property will remain (as between the parties) solely with YWCA Metropolitan Chicago App. YWCA Metropolitan Chicago App, YWCA logo, and all other trademarks, service marks, graphics and logos used in connection with the Services are trademarks or registered trademarks of YWCA Metropolitan Chicago App or YWCA Metropolitan Chicago App’s licensors. Other trademarks, service marks, graphics and logos used in connection with the Services may be the trademarks of other third parties. Your use of the Services grants you no right or license to reproduce or otherwise use any YWCA Metropolitan Chicago App or third-party trademarks.',
    ],
  },
  {
    title: 'Advertising & Promotion',
    text: [
      'By using YWCA Metropolitan Chicago App, you consent to receiving promotional materials from YWCA Metropolitan Chicago App, as well as sponsors of YWCA Metropolitan Chicago App communities and web conferences, announcing special offers and featured web conferences or communities. YWCA Metropolitan Chicago App and its promotional partners may use non-personally identifiable information that you have provided in your profile or otherwise provided to YWCA Metropolitan Chicago App, such as your age, gender, language, country of residence, time zone, as well as information about your relationship with the Services in order to provide offers and promotional materials likely to be of greater interest to you and to help YWCA Metropolitan Chicago App measure and improve the performance of our promotional campaigns. You may opt out of promotional communications at any time by clicking on the “Opt Out” link at the bottom of emails, or managing your Communications Settings in your profile.',
    ],
  },
  {
    title: 'Payment',
    text: [
      'Certain YWCA Metropolitan Chicago App Services require payment to YWCA Metropolitan Chicago App. You will be required to provide banking and payment information to purchase such services. Unless otherwise stated, all fees are quoted in U.S. dollars. You are responsible for paying all fees and applicable taxes associated with our sites and services in a timely manner with a valid payment method. If your payment method fails or your account is past due, we may collect fees owed using other collection mechanisms.',
      'Your paid YWCA Metropolitan Chicago App community, which may start with a free trial, will continue month-to-month unless and until you cancel your community membership or we terminate it. You must have Internet access and provide us with a current, valid, accepted method of payment (as such may be updated from time to time, "Payment Method") to use the YWCA Metropolitan Chicago App community service. We will bill the monthly membership fee to your Payment Method. You must cancel your membership before it renews each month in order to avoid billing of the next month\'s membership fees to your Payment Method.',
    ],
  },
  {
    title: 'Tickets and Dues',
    text: [
      'YWCA Metropolitan Chicago App does not guarantee the quality, safety, legality or truth of any representations made by a dues-collecting (paid) community or ticketed web conference. Any issues you may have with a paid community or web conference should be reported immediately to support@poweredbyaction.com. YWCA Metropolitan Chicago App disclaims any liability for the actions and/or omissions of the organizer(s) of a paid community or a ticketed web conference, and the community/conference organizer(s) will be held fully liable for any fraud, misrepresentations or otherwise illegal or harmful conduct.',
    ],
  },
  {
    title: 'Amendments',
    text: [
      'YWCA Metropolitan Chicago App reserves the right, at its sole discretion, to modify or replace any part of this Agreement, and you agree to be bound by such modifications. Any modifications will be effective immediately upon posting of the revisions on the App, and you waive any right you may have to receive specific notice of such modifications. Your continued use of the Services following the posting of any changes to this Agreement constitutes acceptance of such changes. Therefore, it is your responsibility to periodically review this Agreement for changes. YWCA Metropolitan Chicago App may also, in the future, offer new services and/or features through the Services (including, the release of new tools and resources). Such new features and/or services shall be subject to the terms and conditions of this Agreement.',
    ],
  },
  {
    title: 'Termination',
    text: [
      'YWCA Metropolitan Chicago App may terminate your use of the Services (including free web conferencing) at any time, with or without cause, with or without notice, effective immediately. If you wish to terminate this Agreement or your YWCA Metropolitan Chicago App.com account (if you have one), you may simply discontinue using the Services. All provisions of this Agreement which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.',
    ],
  },
  {
    title: 'Disclaimer of Warranties',
    text: [
      'THE YWCA METROPOLITAN CHICAGO APP SERVICES AND THE YWCA METROPOLITAN CHICAGO APP CONTENT ARE PROVIDED ON AN "AS IS" AND “AS AVAILABLE” BASIS. YWCA METROPOLITAN CHICAGO APP DISCLAIMS ANY AND ALL WARRANTIES, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, ACCURACY, OR NON-INFRINGEMENT. YWCA METROPOLITAN CHICAGO APP DOES NOT REPRESENT OR WARRANT THAT THE YWCA METROPOLITAN CHICAGO APP SERVICES OR THE YWCA METROPOLITAN CHICAGO APP CONTENT, OR ANY PORTION THEREOF, IS OR WILL BE FREE OF DEFECTS OR ERRORS (OR THAT ANY SUCH DEFECTS OR ERRORS WILL BE CORRECTED), VIRUS FREE, OR ABLE TO OPERATE ON AN UNINTERRUPTED BASIS. FURTHER, YWCA METROPOLITAN CHICAGO APP DOES NOT WARRANT OR MAKE ANY REPRESENTATIONS REGARDING THE USE OR THE RESULTS OF THE USE OF THE YWCA METROPOLITAN CHICAGO APP SERVICES, OR ANY PORTION THEREOF, IN TERMS OF ITS CORRECTNESS, ACCURACY, QUALITY, RELIABILITY, OR OTHERWISE. THIS DISCLAIMER CONSTITUTES AN ESSENTIAL PART OF THIS AGREEMENT. IF THIS EXCLUSION IS HELD UNENFORCEABLE, THEN ALL EXPRESS AND IMPLIED WARRANTIES WILL BE LIMITED IN DURATION TO A PERIOD OF FIFTEEN (15) DAYS AFTER THE DELIVERABLE DATE, AND NO WARRANTIES WILL APPLY AFTER THAT PERIOD.',
    ],
  },
  {
    title: 'Limitation of Liability; No Consequential Damages',
    text: [
      'NEITHER YWCA METROPOLITAN CHICAGO APP NOR ITS AFFILIATES AND SUBSIDIARIES NOR ANY OF THEIR SUPPLIERS WILL BE LIABLE TO CLIENT OR ANY OTHER THIRD PARTY FOR ANY DIRECT, INDIRECT, SPECIAL, INCIDENTAL OR CONSEQUENTIAL DAMAGES OF ANY NATURE ARISING OUT OF THE POSSESSION OF, ACCESS TO, USE OF, OR INABILITY TO ACCESS OR USE THE YWCA METROPOLITAN CHICAGO APP SERVICES OR THE YWCA METROPOLITAN CHICAGO APP CONTENT, OR ANY PORTION, INCLUDING, WITHOUT LIMITATION, LOST PROFITS, DATA LOSS, COST OF PROCUREMENT FOR SUBSTITUTE GOODS, OR COMPUTER FAILURE OR MALFUNCTION, EVEN IF YWCA METROPOLITAN CHICAGO APP HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES, AND REGARDLESS OF WHETHER THE CLAIM OR LIABILITY IS BASED UPON ANY CONTRACT, TORT, BREACH OF WARRANTY OR OTHER LEGAL OR EQUITABLE THEORY. CLIENT EXPRESSLY ACKNOWLEDGES AND AGREES THAT THE PARTICIPATION IN AND USE OF THE YWCA METROPOLITAN CHICAGO APP SERVICES AND THE YWCA METROPOLITAN CHICAGO APP CONTENT IS DONE AT CLIENT’S OWN RISK AND THAT CLIENT IS SOLELY RESPONSIBLE AND LIABLE FOR ANY DAMAGE SUSTAINED TO CLIENT’S COMPUTER SYSTEM, NETWORK OR DATA RESULTING FROM SUCH PARTICIPATION OR USE. SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF CERTAIN WARRANTIES OR THE LIMITATION OR EXCLUSION OF LIABILITY FOR INCIDENTAL OR CONSEQUENTIAL DAMAGES.',
    ],
  },
  {
    title: 'General Representation and Warranty',
    text: [
      'You represent and warrant that(i) your use of the App will be in strict accordance with the YWCA Metropolitan Chicago App Privacy Policy, with this Agreement and with all Applicable laws and regulations (including without limitation any local laws or regulations in your country, state, city, or other governmental area, regarding online conduct and acceptable content, and including all Applicable laws regarding the transmission of technical data exported from the United States or the country in which you reside) and (ii) your use of the Services will not infringe or misappropriate the intellectual property rights of any third party.',
    ],
  },
  {
    title: 'Indemnity',
    text: [
      'By using the YWCA Metropolitan Chicago App Services, you agree to indemnify, defend and hold YWCA Metropolitan Chicago App and its affiliates and subsidiaries, and each of their officers, directors, employees, agents, co-branders or other partners (as well as each of their suppliers), successors and permitted assigns (“Indemnified Parties”) harmless from and against any third party claim or action, including any liability, cost, losses, damages, expenses, and attorney’s fees, arising from or in any way related to your access, use or participation in the YWCA Metropolitan Chicago App Services (including claims related to any use of the YWCA Metropolitan Chicago App Services with software, data, content, systems, or other technology not provided by YWCA Metropolitan Chicago App), any violation of this Agreement, or any alleged infringement of a patent, copyright, trademark, trade secret, or other intellectual property right.',
    ],
  },
  {
    title: 'Entire Agreement',
    text: [
      'This Agreement constitutes the entire agreement between YWCA Metropolitan Chicago App and you concerning the subject matter hereof, and it may only be modified by a written amendment signed by an authorized executive of YWCA Metropolitan Chicago App, or by the posting by YWCA Metropolitan Chicago App of a revised version.',
    ],
  },
  {
    title: 'Applicable Law and Venue',
    text: [
      'This Agreement will be governed by the laws of the state of Illinois without Application of its conflict of laws principles. Any suit relating to this Agreement will be instituted in a state or federal court in Cook County, Illinois, and by using the YWCA Metropolitan Chicago App Services you irrevocably consent and waive all objections to the jurisdiction of any such court. Except to the extent Applicable by law, if any, provides otherwise, this Agreement, any access to or use of the App will be governed by the laws of the state of Illinois, U.S.A., excluding its conflict of law provisions, and the proper venue for any disputes arising out of or relating to any of the same will be the state and federal courts located in Cook County, Illinois. Except for claims for injunctive or equitable relief or claims regarding intellectual property rights (which may be brought in any competent court without the posting of a bond), any dispute arising under this Agreement shall be finally settled in accordance with the Comprehensive Arbitration Rules of the Judicial Arbitration and Mediation Service, Inc. (“JAMS”) by three arbitrators Appointed in accordance with such Rules. The arbitration shall take place in Chicago, Illinois, in the English language and the arbitral decision may be enforced in any court. The prevailing party in any action or proceeding to enforce this Agreement shall be entitled to costs and attorneys’ fees.',
    ],
  },
  {
    title: 'Survival',
    text: [
      'Any term or condition of this Agreement that by its nature would logically survive termination or expiration, including but not limited to protections of proprietary rights, indemnifications, and limitations of liability, will survive such termination or expiration.',
    ],
  },
  {
    title: 'Waiver',
    text: [
      'A waiver by either party of any term or condition of this Agreement or any breach thereof, in any one instance, will not waive such term or condition or any subsequent breach thereof. You may assign your rights under this Agreement to any party that consents to, and agrees to be bound by, its terms and conditions; YWCA Metropolitan Chicago App may assign its rights under this Agreement without condition.',
    ],
  },
];

type State = {
  ready: boolean,
};

export default class HelpScreen extends Component<{}, State> {
  static navigationOptions = {
    headerTitle: 'Terms and conditions',
  };

  state = {
    ready: false,
  };

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ ready: true });
    });
  }

  render() {
    return (
      <DeferExpensiveTasks>
        <Screen>
          <View>
            {TERMS.map((bag, idx) => <HelpBlock key={idx} {...bag} />)}
          </View>
        </Screen>
      </DeferExpensiveTasks>
    );
  }
}
