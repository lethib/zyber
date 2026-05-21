export interface MeasureTranslation {
	title: string;
	description: string;
}

export const THEME_LABELS: Record<string, string> = {
	AwarenessAndTraining: "Sensibiliser et former",
	KnowYourInformationSystem: "Connaître le système d'information",
	AuthenticateAndControlAccess: "Authentifier et contrôler les accès",
	SecureWorkstations: "Sécuriser les postes",
	SecureNetwork: "Sécuriser le réseau",
	SecureAdministration: "Sécuriser l'administration",
	ManageMobility: "Gérer le nomadisme",
	MaintainSystemUpToDate: "Maintenir le système d'information à jour",
	MonitorAuditRespond: "Superviser, auditer, réagir",
	GoFurther: "Pour aller plus loin",
};

export const THEME_SHORT_LABELS: Record<string, string> = {
	AwarenessAndTraining: "Sensibiliser",
	KnowYourInformationSystem: "Connaître SI",
	AuthenticateAndControlAccess: "Authentifier",
	SecureWorkstations: "Postes",
	SecureNetwork: "Réseau",
	SecureAdministration: "Admin.",
	ManageMobility: "Nomadisme",
	MaintainSystemUpToDate: "MAJ SI",
	MonitorAuditRespond: "Superviser",
	GoFurther: "Plus loin",
};

export const LEVEL_LABELS: Record<string, string> = {
	Standard: "Standard",
	Enhanced: "Renforcé",
};

export const MEASURE_TRANSLATIONS: Record<number, MeasureTranslation> = {
	1: {
		title: "Former les équipes opérationnelles à la sécurité des systèmes d'information",
		description:
			"Les équipes opérationnelles (administrateurs réseau, sécurité et système, chefs de projet, développeurs, RSSI) doivent suivre à leur prise de poste puis à intervalles réguliers des formations sur la législation, les principaux risques et menaces, l'authentification et le contrôle d'accès, le paramétrage des systèmes, le cloisonnement réseau et la journalisation.",
	},
	2: {
		title:
			"Sensibiliser les utilisateurs aux bonnes pratiques élémentaires de sécurité informatique",
		description:
			"Chaque utilisateur doit être informé dès son arrivée des enjeux de sécurité, des règles à respecter et des bons comportements à adopter. Les sensibilisations doivent être régulières, adaptées aux utilisateurs ciblés, et aborder les objectifs SSI, les informations sensibles, les réglementations et les règles de sécurité quotidiennes.",
	},
	3: {
		title: "Maîtriser les risques de l'infogérance",
		description:
			"Lorsqu'une entité externalise son système d'information, elle doit évaluer les risques spécifiques à l'infogérance et imposer des exigences précises au prestataire : réversibilité du contrat, réalisation d'audits, sauvegarde et restitution des données dans un format ouvert, maintien à niveau de la sécurité. Le prestataire fournira un plan d'assurance sécurité (PAS).",
	},
	4: {
		title:
			"Identifier les informations et serveurs les plus sensibles et maintenir un schéma du réseau",
		description:
			"Il est indispensable d'identifier les données sensibles et de créer un schéma simplifié du réseau représentant les zones IP, le plan d'adressage, les équipements de routage et de sécurité, et les interconnexions avec l'extérieur. Ce schéma doit permettre de localiser les serveurs détenteurs d'informations sensibles.",
	},
	5: {
		title: "Disposer d'un inventaire exhaustif des comptes privilégiés et le maintenir à jour",
		description:
			"Effectuer un inventaire des comptes bénéficiant de droits spécifiques, le mettre à jour régulièrement, et y renseigner les utilisateurs ayant des droits administrateur ou des accès élargis. Procéder à une revue périodique pour supprimer les accès devenus obsolètes.",
	},
	6: {
		title:
			"Organiser les procédures d'arrivée, de départ et de changement de fonction des utilisateurs",
		description:
			"Définir des procédures d'arrivée et de départ en lien avec les RH, couvrant la création/suppression des comptes, les droits d'accès, la gestion des accès physiques, l'affectation des équipements mobiles et la gestion des informations sensibles. Les procédures doivent être formalisées et mises à jour.",
	},
	7: {
		title: "Autoriser la connexion au réseau de l'entité aux seuls équipements maîtrisés",
		description:
			"Seule la connexion de terminaux maîtrisés par l'entité doit être autorisée sur ses réseaux d'accès, filaires ou sans fil. Des solutions pragmatiques comme un réseau Wi-Fi dédié pour terminaux personnels doivent être proposées. En renforcé : authentification des postes via 802.1X ou équivalent.",
	},
	8: {
		title:
			"Identifier nommément chaque personne accédant au système et distinguer les rôles utilisateur/administrateur",
		description:
			"Les comptes d'accès doivent être nominatifs. Un compte d'administration nominatif distinct du compte utilisateur doit être attribué à chaque administrateur. En renforcé : activer la journalisation liée aux comptes (relevé des connexions réussies/échouées).",
	},
	9: {
		title: "Attribuer les bons droits sur les ressources sensibles du système d'information",
		description:
			"Établir une liste précise des ressources sensibles, définir quelle population peut y avoir accès, contrôler strictement leur accès, et éviter leur dispersion. Une revue régulière des droits d'accès doit être réalisée pour identifier les accès non autorisés.",
	},
	10: {
		title: "Définir et vérifier des règles de choix et de dimensionnement des mots de passe",
		description:
			"Encadrer et vérifier l'application des règles de choix et de dimensionnement des mots de passe : blocage des comptes après plusieurs échecs, désactivation des connexions anonymes, utilisation d'un outil d'audit de robustesse des mots de passe.",
	},
	11: {
		title: "Protéger les mots de passe stockés sur les systèmes",
		description:
			"Les mots de passe doivent être protégés au moyen de solutions sécurisées : coffre-fort numérique et mécanismes de chiffrement. Le stockage sur support physique (post-it) ou non chiffré est à proscrire.",
	},
	12: {
		title: "Changer les éléments d'authentification par défaut sur les équipements et services",
		description:
			"Les éléments d'authentification par défaut doivent être modifiés dès l'installation. En renforcé : procéder au renouvellement régulier des authentifiants après leur changement initial pour limiter les conséquences d'une compromission.",
	},
	13: {
		title: "Privilégier lorsque c'est possible une authentification forte",
		description:
			"Mettre en œuvre une authentification forte à deux facteurs (quelque chose que je sais, possède, ou suis). En renforcé : privilégier les cartes à puce ou mécanismes OTP avec jeton physique. Standard : cartes à puce ou mécanismes d'authentification forte adaptés.",
	},
	14: {
		title: "Mettre en place un niveau de sécurité minimal sur l'ensemble du parc informatique",
		description:
			"Implémenter un niveau de sécurité minimal : limiter les applications installées, doter les postes d'un pare-feu et d'un antivirus, chiffrer les partitions des données utilisateurs, désactiver l'exécution automatique. En renforcé : isoler les postes nécessitant dérogation et assurer des sauvegardes régulières déconnectées.",
	},
	15: {
		title: "Se protéger des menaces relatives à l'utilisation de supports amovibles",
		description:
			"Proscrire le branchement de clés USB inconnues, limiter celui de clés non maîtrisées et faire inspecter leur contenu par l'antivirus. En renforcé : interdire l'exécution de programmes sur les périphériques amovibles (Applocker/noexec) et appliquer une procédure de mise au rebut sécurisée.",
	},
	16: {
		title:
			"Utiliser un outil de gestion centralisée afin d'homogénéiser les politiques de sécurité",
		description:
			"Se doter d'un outil de gestion centralisée (ex : Active Directory) pour appliquer de manière simple et rapide les politiques de sécurité sur l'ensemble du parc informatique (postes de travail et serveurs), facilitant la mise en œuvre de contre-mesures en cas de crise.",
	},
	17: {
		title: "Activer et configurer le pare-feu local des postes de travail",
		description:
			"Activer le pare-feu local des postes de travail pour rendre plus difficile les déplacements latéraux d'un attaquant. En renforcé : bloquer les ports d'administration par défaut (TCP 135, 445, 3389, 22) sauf depuis les équipements explicitement autorisés, et journaliser les flux bloqués.",
	},
	18: {
		title: "Chiffrer les données sensibles transmises par voie Internet",
		description:
			"Procéder au chiffrement systématique des données envoyées par courriel ou transmises via des outils d'hébergement en ligne. La transmission du secret de déchiffrement doit se faire via un canal de confiance distinct du canal de transmission des données.",
	},
	19: {
		title: "Segmenter le réseau et mettre en place un cloisonnement entre ces zones",
		description:
			"Raisonner par segmentation en zones composées de systèmes aux besoins de sécurité homogènes (serveurs d'infrastructure, serveurs métiers, postes utilisateurs, postes administrateurs). Mettre en place des VLAN et sous-réseaux IP dédiés avec filtrage IP entre zones.",
	},
	20: {
		title: "S'assurer de la sécurité des réseaux d'accès Wi-Fi et de la séparation des usages",
		description:
			"Utiliser un chiffrement robuste (WPA2/AES CCMP) avec authentification centralisée. Séparer le réseau Wi-Fi des terminaux personnels ou visiteurs de celui des terminaux de l'entité (SSID et VLAN distincts). Administrer les points d'accès de manière sécurisée.",
	},
	21: {
		title: "Utiliser des protocoles réseaux sécurisés dès qu'ils existent",
		description:
			"Utiliser les protocoles réseaux sécurisés (HTTPS, IMAPS, SMTPS, POP3S, SSH) dès que possible, que ce soit sur des réseaux publics ou sur le réseau interne de l'entité. Remplacer les protocoles non sécurisés (TELNET, RLOGIN) par leurs équivalents sécurisés.",
	},
	22: {
		title: "Mettre en place une passerelle d'accès sécurisé à Internet",
		description:
			"Mettre en œuvre une passerelle sécurisée comprenant un pare-feu et un serveur mandataire (proxy) avec authentification des utilisateurs et journalisation. En renforcé : activer l'analyse antivirus du contenu, le filtrage par catégories d'URLs, et désactiver les résolutions DNS directes depuis les postes.",
	},
	23: {
		title: "Cloisonner les services visibles depuis Internet du reste du système d'information",
		description:
			"Cloisonner physiquement les infrastructures d'hébergement Internet de toutes les infrastructures du SI non visibles depuis Internet. Mettre en place une infrastructure d'interconnexion filtrant les flux et imposant le passage par un reverse proxy.",
	},
	24: {
		title: "Protéger sa messagerie professionnelle",
		description:
			"Assurer l'analyse antivirus en amont des boîtes aux lettres, le chiffrement TLS des échanges entre serveurs. En renforcé : déployer un service anti-spam et mettre en place les mécanismes SPF, DKIM, DMARC. Ne pas exposer directement les serveurs de boîtes aux lettres sur Internet.",
	},
	25: {
		title: "Sécuriser les interconnexions réseau dédiées avec les partenaires",
		description:
			"Effectuer un filtrage IP strict au plus près des flux partenaires et réduire la matrice des flux au juste besoin. En renforcé : dédier l'équipement de filtrage aux connexions partenaires et ajouter un système de détection d'intrusions.",
	},
	26: {
		title: "Contrôler et protéger l'accès aux salles serveurs et aux locaux techniques",
		description:
			"Contrôler les accès aux salles serveurs avec serrures ou contrôle d'accès par badge. Proscrire les accès non accompagnés des prestataires. Réaliser une revue régulière des droits d'accès. Restreindre ou désactiver les prises réseau dans les zones ouvertes au public.",
	},
	27: {
		title:
			"Interdire l'accès à Internet depuis les postes ou serveurs utilisés pour l'administration du système d'information",
		description:
			"Les postes d'administration ne doivent en aucun cas avoir accès à Internet. Mettre à disposition un poste distinct pour les usages bureautiques. En renforcé : récupérer les mises à jour depuis une source sûre et les transférer via support amovible dédié ou zone d'échanges.",
	},
	28: {
		title: "Utiliser un réseau dédié et cloisonné pour l'administration du système d'information",
		description:
			"Cloisonner spécifiquement le réseau d'administration du réseau bureautique. Recommandations : cloisonnement physique en priorité (renforcé), à défaut cloisonnement logique cryptographique via tunnels IPsec (standard), au minimum cloisonnement logique par VLAN.",
	},
	29: {
		title:
			"Limiter au strict besoin opérationnel les droits d'administration sur les postes de travail",
		description:
			"Par défaut, aucun utilisateur ne doit disposer de privilèges d'administration sur son poste de travail, quelle que soit sa position hiérarchique. Seuls les administrateurs chargés de l'administration des postes disposent de ces droits lors de leurs interventions. Toute délégation doit être tracée et limitée dans le temps.",
	},
	30: {
		title: "Prendre des mesures de sécurisation physique des terminaux nomades",
		description:
			"Sensibiliser les utilisateurs pour augmenter leur vigilance en déplacement. Banaliser les terminaux, utiliser des filtres de confidentialité. En renforcé : utiliser un support externe complémentaire (carte à puce ou jeton USB) pour conserver les secrets de déchiffrement ou d'authentification.",
	},
	31: {
		title:
			"Chiffrer les données sensibles, en particulier sur le matériel potentiellement perdable",
		description:
			"Ne stocker que des données préalablement chiffrées sur l'ensemble des matériels nomades. Privilégier le chiffrement complet du disque. Seul un secret (mot de passe, carte à puce, code PIN) permettra l'accès aux données.",
	},
	32: {
		title: "Sécuriser la connexion réseau des postes utilisés en situation de nomadisme",
		description:
			"Établir un tunnel VPN IPsec automatique et non débrayable entre le poste nomade et une passerelle VPN. En renforcé : utiliser une authentification forte avec certificat sur support externe (carte à puce ou jeton USB) ou mécanisme OTP pour éviter la réutilisation d'authentifiants depuis un poste volé.",
	},
	33: {
		title: "Adopter des politiques de sécurité dédiées aux terminaux mobiles",
		description:
			"Ne pas mutualiser les usages personnel et professionnel. Utiliser une solution de gestion centralisée des équipements mobiles (MDM). En renforcé : désactiver les assistants vocaux intégrés qui augmentent la surface d'attaque.",
	},
	34: {
		title: "Définir une politique de mise à jour des composants du système d'information",
		description:
			"Appliquer les correctifs de sécurité sur l'ensemble des composants dans le mois qui suit leur publication. Définir une politique de mise à jour couvrant l'inventaire des composants, les sources d'information sur les mises à jour, les outils de déploiement, et la qualification progressive des correctifs.",
	},
	35: {
		title:
			"Anticiper la fin de la maintenance des logiciels et systèmes et limiter les adhérences logicielles",
		description:
			"Établir un inventaire des systèmes et applications, assurer le suivi des dates de fin de support, maintenir un parc logiciel homogène, limiter les adhérences logicielles, et inclure des clauses de suivi des correctifs dans les contrats prestataires.",
	},
	36: {
		title: "Activer et configurer les journaux des composants les plus importants",
		description:
			"Journaliser les événements critiques (pare-feu, authentifications, erreurs de protocoles) pendant au moins un an. S'assurer de la synchronisation NTP. En renforcé : centraliser les journaux sur un dispositif dédié pour faciliter la recherche automatisée d'événements suspects et empêcher leur effacement.",
	},
	37: {
		title: "Définir et appliquer une politique de sauvegarde des composants critiques",
		description:
			"Formaliser une politique de sauvegarde couvrant la liste des données vitales, les types de sauvegarde, la fréquence, les procédures d'administration, de stockage et de test de restauration. En renforcé : planifier un exercice de restauration annuel et en conserver les résultats.",
	},
	38: {
		title:
			"Procéder à des contrôles et audits de sécurité réguliers puis appliquer les actions correctives associées",
		description:
			"Réaliser des audits réguliers (au moins une fois par an) du système d'information par des équipes internes ou des sociétés spécialisées. À l'issue des audits, identifier les actions correctives, planifier leur application et organiser des points de suivi. Les prestataires PASSI qualifiés par l'ANSSI sont recommandés.",
	},
	39: {
		title:
			"Désigner un référent en sécurité des systèmes d'information et le faire connaître auprès du personnel",
		description:
			"Désigner un référent SSI connu de tous les utilisateurs, chargé de définir les règles de sécurité, vérifier leur application, sensibiliser les utilisateurs et centraliser le traitement des incidents. Ce référent doit être formé à la SSI et à la gestion de crise.",
	},
	40: {
		title: "Définir une procédure de gestion des incidents de sécurité",
		description:
			"Définir les bons réflexes en cas d'incident : déconnecter la machine du réseau, maintenir sous tension sans redémarrer, prévenir la hiérarchie et le référent SSI. Consigner tout incident dans un registre. Possibilité de faire appel à un prestataire PRIS qualifié par l'ANSSI.",
	},
	41: {
		title: "Mener une analyse de risques formelle",
		description:
			"Mener une analyse de risques formelle selon une méthodologie dédiée (ex : EBIOS). La démarche consiste à définir le contexte, apprécier les risques selon leur probabilité et gravité, les traiter et élaborer un plan de traitement validé par une autorité désignée.",
	},
	42: {
		title: "Privilégier l'usage de produits et de services qualifiés par l'ANSSI",
		description:
			"Utiliser des produits et prestataires qualifiés par l'ANSSI (catalogue disponible sur ssi.gouv.fr/qualifications). Les qualifications couvrent les prestataires d'audit (PASSI), de réponse aux incidents (PRIS), de détection d'incidents (PDIS) et de services cloud sécurisés (SecNumCloud).",
	},
};
