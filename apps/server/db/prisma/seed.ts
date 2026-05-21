import { MeasureLevel, MeasureTheme } from "@prisma/client";
import { prisma } from "../src/index";

const measures = [
	// Theme I: Awareness and Training
	{
		order: 1,
		theme: MeasureTheme.AwarenessAndTraining,
		level: MeasureLevel.Standard,
		title: "Train operational teams on information system security",
		description:
			"Operational teams (network, security and system administrators, project managers, developers, CISOs) must receive training on joining and at regular intervals covering legislation, key risks and threats, authentication and access control, system configuration, network segmentation, and logging.",
	},
	{
		order: 2,
		theme: MeasureTheme.AwarenessAndTraining,
		level: MeasureLevel.Enhanced,
		title: "Raise user awareness of basic cybersecurity best practices",
		description:
			"Every user must be briefed on arrival about security stakes, rules to follow, and good behaviours to adopt. Awareness sessions must be regular, tailored to the target audience, and cover information security objectives, sensitive information, regulations, and day-to-day security rules.",
	},
	{
		order: 3,
		theme: MeasureTheme.AwarenessAndTraining,
		level: MeasureLevel.Standard,
		title: "Manage IT outsourcing risks",
		description:
			"When an organisation outsources its information system, it must assess the specific risks of outsourcing and impose precise requirements on the provider: contract reversibility, audit rights, data backup and return in an open format, and maintained security levels. The provider will supply a security assurance plan (SAP).",
	},
	// Theme II: Know Your Information System
	{
		order: 4,
		theme: MeasureTheme.KnowYourInformationSystem,
		level: MeasureLevel.Standard,
		title: "Identify sensitive information and servers, and maintain a network diagram",
		description:
			"It is essential to identify sensitive data and create a simplified network diagram showing IP zones, address plan, routing and security equipment, and external interconnections. This diagram must allow the location of servers holding sensitive information.",
	},
	{
		order: 5,
		theme: MeasureTheme.KnowYourInformationSystem,
		level: MeasureLevel.Standard,
		title: "Maintain a comprehensive and up-to-date inventory of privileged accounts",
		description:
			"Maintain an inventory of accounts with specific rights, update it regularly, and record users with administrator rights or elevated access. Conduct periodic reviews to remove obsolete access.",
	},
	{
		order: 6,
		theme: MeasureTheme.KnowYourInformationSystem,
		level: MeasureLevel.Enhanced,
		title: "Define procedures for user onboarding, offboarding, and role changes",
		description:
			"Define onboarding and offboarding procedures in coordination with HR, covering account creation/deletion, access rights, physical access management, mobile device assignment, and handling of sensitive information. Procedures must be formalised and kept up to date.",
	},
	{
		order: 7,
		theme: MeasureTheme.KnowYourInformationSystem,
		level: MeasureLevel.Enhanced,
		title: "Restrict network access to managed devices only",
		description:
			"Only connections from organisation-managed devices should be authorised on its access networks, wired or wireless. Pragmatic solutions such as a dedicated Wi-Fi network for personal devices should be provided. In enhanced mode: workstation authentication via 802.1X or equivalent.",
	},
	// Theme III: Authenticate and Control Access
	{
		order: 8,
		theme: MeasureTheme.AuthenticateAndControlAccess,
		level: MeasureLevel.Enhanced,
		title: "Identify each system user by name and separate user and administrator roles",
		description:
			"Access accounts must be personal. A separate named administration account distinct from the user account must be assigned to each administrator. In enhanced mode: enable account-related logging (record of successful/failed logins).",
	},
	{
		order: 9,
		theme: MeasureTheme.AuthenticateAndControlAccess,
		level: MeasureLevel.Standard,
		title: "Assign appropriate permissions on sensitive information system resources",
		description:
			"Establish a precise list of sensitive resources, define which populations can access them, strictly control their access, and avoid their proliferation. Regular access rights reviews must be conducted to identify unauthorised access.",
	},
	{
		order: 10,
		theme: MeasureTheme.AuthenticateAndControlAccess,
		level: MeasureLevel.Standard,
		title: "Define and enforce password selection and complexity rules",
		description:
			"Oversee and verify the application of password selection and complexity rules: account lockout after multiple failures, disabling anonymous logins, use of a password strength audit tool.",
	},
	{
		order: 11,
		theme: MeasureTheme.AuthenticateAndControlAccess,
		level: MeasureLevel.Standard,
		title: "Protect passwords stored on systems",
		description:
			"Passwords must be protected using secure solutions: digital vaults and encryption mechanisms. Storage on physical media (sticky notes) or unencrypted storage must be prohibited.",
	},
	{
		order: 12,
		theme: MeasureTheme.AuthenticateAndControlAccess,
		level: MeasureLevel.Enhanced,
		title: "Change default authentication credentials on devices and services",
		description:
			"Default authentication credentials must be changed upon installation. In enhanced mode: regularly renew credentials after the initial change to limit the impact of a compromise.",
	},
	{
		order: 13,
		theme: MeasureTheme.AuthenticateAndControlAccess,
		level: MeasureLevel.Enhanced,
		title: "Use strong authentication wherever possible",
		description:
			"Implement two-factor strong authentication (something you know, have, or are). In enhanced mode: prefer smart cards or OTP mechanisms with a physical token. Standard: smart cards or suitable strong authentication mechanisms.",
	},
	// Theme IV: Secure Workstations
	{
		order: 14,
		theme: MeasureTheme.SecureWorkstations,
		level: MeasureLevel.Enhanced,
		title: "Implement a minimum security baseline across all IT assets",
		description:
			"Implement a minimum security level: limit installed applications, equip workstations with a firewall and antivirus, encrypt user data partitions, disable autorun. In enhanced mode: isolate non-compliant workstations and ensure regular offline backups.",
	},
	{
		order: 15,
		theme: MeasureTheme.SecureWorkstations,
		level: MeasureLevel.Enhanced,
		title: "Protect against threats posed by removable media",
		description:
			"Prohibit plugging in unknown USB drives, limit use of unmanaged drives and have their contents scanned by antivirus. In enhanced mode: prohibit execution of programmes on removable devices (AppLocker/noexec) and apply a secure disposal procedure.",
	},
	{
		order: 16,
		theme: MeasureTheme.SecureWorkstations,
		level: MeasureLevel.Standard,
		title: "Use a centralised management tool to standardise security policies",
		description:
			"Adopt a centralised management tool (e.g. Active Directory) to simply and quickly apply security policies across all IT assets (workstations and servers), facilitating countermeasure deployment during a crisis.",
	},
	{
		order: 17,
		theme: MeasureTheme.SecureWorkstations,
		level: MeasureLevel.Enhanced,
		title: "Enable and configure the local firewall on workstations",
		description:
			"Enable the workstation local firewall to make lateral movement more difficult for attackers. In enhanced mode: block default administration ports (TCP 135, 445, 3389, 22) except from explicitly authorised devices, and log blocked traffic.",
	},
	{
		order: 18,
		theme: MeasureTheme.SecureWorkstations,
		level: MeasureLevel.Standard,
		title: "Encrypt sensitive data transmitted over the Internet",
		description:
			"Systematically encrypt data sent by email or transmitted via online hosting tools. The decryption key must be transmitted via a trusted channel separate from the data transmission channel.",
	},
	// Theme V: Secure Network
	{
		order: 19,
		theme: MeasureTheme.SecureNetwork,
		level: MeasureLevel.Standard,
		title: "Segment the network and implement zone separation",
		description:
			"Design the network around segments composed of systems with homogeneous security needs (infrastructure servers, business servers, user workstations, administration workstations). Implement dedicated VLANs and IP subnets with IP filtering between zones.",
	},
	{
		order: 20,
		theme: MeasureTheme.SecureNetwork,
		level: MeasureLevel.Standard,
		title: "Ensure the security of Wi-Fi access networks and separate usage types",
		description:
			"Use strong encryption (WPA2/AES CCMP) with centralised authentication. Separate the Wi-Fi network for personal or guest devices from the organisation's network (distinct SSIDs and VLANs). Administer access points securely.",
	},
	{
		order: 21,
		theme: MeasureTheme.SecureNetwork,
		level: MeasureLevel.Standard,
		title: "Use secure network protocols whenever available",
		description:
			"Use secure network protocols (HTTPS, IMAPS, SMTPS, POP3S, SSH) whenever possible, on both public and internal networks. Replace unsecured protocols (TELNET, RLOGIN) with their secure equivalents.",
	},
	{
		order: 22,
		theme: MeasureTheme.SecureNetwork,
		level: MeasureLevel.Enhanced,
		title: "Deploy a secure Internet access gateway",
		description:
			"Implement a secure gateway including a firewall and a proxy server with user authentication and logging. In enhanced mode: enable antivirus content analysis, URL category filtering, and disable direct DNS resolution from workstations.",
	},
	{
		order: 23,
		theme: MeasureTheme.SecureNetwork,
		level: MeasureLevel.Standard,
		title: "Isolate Internet-facing services from the rest of the information system",
		description:
			"Physically isolate Internet hosting infrastructure from all IS infrastructure not visible from the Internet. Implement an interconnection infrastructure filtering traffic and enforcing routing through a reverse proxy.",
	},
	{
		order: 24,
		theme: MeasureTheme.SecureNetwork,
		level: MeasureLevel.Enhanced,
		title: "Protect corporate email",
		description:
			"Ensure upstream antivirus analysis of mailboxes and TLS encryption of inter-server exchanges. In enhanced mode: deploy an anti-spam service and implement SPF, DKIM, and DMARC mechanisms. Do not expose mailbox servers directly to the Internet.",
	},
	{
		order: 25,
		theme: MeasureTheme.SecureNetwork,
		level: MeasureLevel.Enhanced,
		title: "Secure dedicated network interconnections with partners",
		description:
			"Apply strict IP filtering as close as possible to partner traffic flows and reduce the traffic matrix to the minimum necessary. In enhanced mode: dedicate the filtering device to partner connections and add an intrusion detection system.",
	},
	{
		order: 26,
		theme: MeasureTheme.SecureNetwork,
		level: MeasureLevel.Standard,
		title: "Control and protect access to server rooms and technical premises",
		description:
			"Control access to server rooms with locks or badge access control. Prohibit unaccompanied access by contractors. Conduct regular access rights reviews. Restrict or disable network ports in publicly accessible areas.",
	},
	// Theme VI: Secure Administration
	{
		order: 27,
		theme: MeasureTheme.SecureAdministration,
		level: MeasureLevel.Enhanced,
		title: "Prohibit Internet access from administration workstations or servers",
		description:
			"Administration workstations must have no Internet access under any circumstances. Provide a separate workstation for office tasks. In enhanced mode: retrieve updates from a trusted source and transfer via a dedicated removable device or exchange zone.",
	},
	{
		order: 28,
		theme: MeasureTheme.SecureAdministration,
		level: MeasureLevel.Enhanced,
		title: "Use a dedicated and isolated network for system administration",
		description:
			"Specifically isolate the administration network from the office network. Recommendations: physical isolation first (enhanced), otherwise cryptographic logical isolation via IPsec tunnels (standard), at minimum logical VLAN isolation.",
	},
	{
		order: 29,
		theme: MeasureTheme.SecureAdministration,
		level: MeasureLevel.Standard,
		title: "Restrict administration privileges on workstations to operational needs only",
		description:
			"By default, no user should have administration privileges on their workstation, regardless of their hierarchical position. Only administrators responsible for workstation management hold these rights during their interventions. All delegations must be logged and time-limited.",
	},
	// Theme VII: Manage Mobility
	{
		order: 30,
		theme: MeasureTheme.ManageMobility,
		level: MeasureLevel.Enhanced,
		title: "Implement physical security measures for mobile devices",
		description:
			"Raise users' awareness to increase their vigilance when travelling. Make devices inconspicuous and use privacy screens. In enhanced mode: use an additional external storage device (smart card or USB token) to hold decryption or authentication secrets.",
	},
	{
		order: 31,
		theme: MeasureTheme.ManageMobility,
		level: MeasureLevel.Standard,
		title: "Encrypt sensitive data, especially on equipment that could be lost or stolen",
		description:
			"Only store previously encrypted data on all mobile devices. Prefer full disk encryption. Only a secret (password, smart card, PIN) will allow access to the data.",
	},
	{
		order: 32,
		theme: MeasureTheme.ManageMobility,
		level: MeasureLevel.Enhanced,
		title: "Secure network connections for devices used in remote work scenarios",
		description:
			"Establish an automatic and non-bypassable IPsec VPN tunnel between the mobile device and a VPN gateway. In enhanced mode: use strong authentication with a certificate on an external medium (smart card or USB token) or an OTP mechanism to prevent credential reuse from a stolen device.",
	},
	{
		order: 33,
		theme: MeasureTheme.ManageMobility,
		level: MeasureLevel.Enhanced,
		title: "Adopt dedicated security policies for mobile devices",
		description:
			"Do not mix personal and professional uses. Use a centralised mobile device management (MDM) solution. In enhanced mode: disable built-in voice assistants that increase the attack surface.",
	},
	// Theme VIII: Maintain System Up to Date
	{
		order: 34,
		theme: MeasureTheme.MaintainSystemUpToDate,
		level: MeasureLevel.Standard,
		title: "Define an update policy for information system components",
		description:
			"Apply security patches to all components within one month of their publication. Define an update policy covering the component inventory, update information sources, deployment tools, and progressive patch qualification.",
	},
	{
		order: 35,
		theme: MeasureTheme.MaintainSystemUpToDate,
		level: MeasureLevel.Standard,
		title: "Plan for software and system end-of-life and limit software dependencies",
		description:
			"Maintain an inventory of systems and applications, track end-of-support dates, maintain a homogeneous software base, limit software dependencies, and include patch-tracking clauses in contractor agreements.",
	},
	// Theme IX: Monitor, Audit, Respond
	{
		order: 36,
		theme: MeasureTheme.MonitorAuditRespond,
		level: MeasureLevel.Enhanced,
		title: "Enable and configure logs for the most critical components",
		description:
			"Log critical events (firewall, authentication, protocol errors) for at least one year. Ensure NTP synchronisation. In enhanced mode: centralise logs on a dedicated device to facilitate automated detection of suspicious events and prevent their deletion.",
	},
	{
		order: 37,
		theme: MeasureTheme.MonitorAuditRespond,
		level: MeasureLevel.Enhanced,
		title: "Define and enforce a backup policy for critical components",
		description:
			"Formalise a backup policy covering the list of critical data, backup types, frequency, administration and storage procedures, and restoration testing. In enhanced mode: schedule an annual restoration exercise and retain the results.",
	},
	{
		order: 38,
		theme: MeasureTheme.MonitorAuditRespond,
		level: MeasureLevel.Enhanced,
		title: "Conduct regular security audits and apply the resulting corrective actions",
		description:
			"Conduct regular audits (at least once a year) of the information system by internal teams or specialist firms. Following audits, identify corrective actions, plan their implementation, and organise follow-up meetings. ANSSI-qualified PASSI providers are recommended.",
	},
	{
		order: 39,
		theme: MeasureTheme.MonitorAuditRespond,
		level: MeasureLevel.Standard,
		title: "Appoint an information security officer and make them known to all staff",
		description:
			"Appoint an information security officer known to all users, responsible for defining security rules, verifying their application, raising user awareness, and centralising incident handling. This officer must be trained in information security and crisis management.",
	},
	{
		order: 40,
		theme: MeasureTheme.MonitorAuditRespond,
		level: MeasureLevel.Standard,
		title: "Define a security incident management procedure",
		description:
			"Define the right reflexes in the event of an incident: disconnect the machine from the network, keep it powered on without restarting, notify management and the security officer. Log all incidents in a register. An ANSSI-qualified PRIS provider may be called upon.",
	},
	// Theme X: Go Further
	{
		order: 41,
		theme: MeasureTheme.GoFurther,
		level: MeasureLevel.Enhanced,
		title: "Conduct a formal risk analysis",
		description:
			"Conduct a formal risk analysis using a dedicated methodology (e.g. EBIOS). The approach consists of defining the context, assessing risks by probability and severity, treating them, and drawing up a treatment plan validated by a designated authority.",
	},
	{
		order: 42,
		theme: MeasureTheme.GoFurther,
		level: MeasureLevel.Enhanced,
		title: "Prefer ANSSI-qualified products and services",
		description:
			"Use products and service providers qualified by ANSSI (catalogue available at ssi.gouv.fr/qualifications). Qualifications cover audit providers (PASSI), incident response providers (PRIS), incident detection providers (PDIS), and secure cloud services (SecNumCloud).",
	},
];

async function main() {
	console.log("Seeding 42 ANSSI measures...");
	const result = await prisma.measure.createMany({
		data: measures,
		skipDuplicates: true,
	});
	console.log(`Seeded ${result.count} measures (${measures.length - result.count} skipped)`);
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(() => prisma.$disconnect());
