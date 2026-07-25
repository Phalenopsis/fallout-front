import { SkillDefinition } from './skill.desc';

export const energyWeapons: SkillDefinition = {
  name: 'energyWeapons',
  nom: 'Armes à énergie',
  SPECIAL: 'Perception',
  secondarySPECIAL: ['Intelligence', 'Agilité'],
  shortDescription: [
    'Armes à énergie est la compétence que vous utilisez quand vous maniez une arme à énergie.',
  ],
  description: [
    "Armes à énergie est la compétence que vous utilisez quand vous maniez les pistolets laser, les pistolets à plasma, les armes de Gauss ou toute autre arme qui tire un trait d'énergie.",
    "L'intelligence permet de modifier ou/et de réparer les armes, l'agilité permet de désamorcer un piège impliquant une arme à énergie.",
  ],
};
export const meleeWeapons: SkillDefinition = {
  name: 'meleeWeapons',
  nom: 'Armes de corps à corps',
  SPECIAL: 'Force',
  secondarySPECIAL: ['Agilité', 'Charisme'],
  shortDescription: [
    'Arme de corps à corps est la compétence que vous utilisez quand vous maniez une arme de corps à corps.',
  ],
  description: [
    "Elle permet d'infliger der dégàts et dévier les coups avec des armes de corps à corps de tout type",
    "L'agilité permet de parer une attaque au corps à corps, le Charisme permet de menacer quelqu'un.",
  ],
};
export const smallGuns: SkillDefinition = {
  name: 'smallGuns',
  nom: 'Armes légères',
  SPECIAL: 'Agilité',
  secondarySPECIAL: ['Charisme', 'Endurance'],
  shortDescription: [
    'Armes légères est la compétence que vous utilisez quand vous maniez une arme légère.',
  ],
  description: [
    'La compétence Armes légères mesure votre précision avec les armes à un coup, les pistolets automatiques, les fusils et les fusils à pompe, ainsi que vos connaissances pratiques en la matière.',
    "Le Charisme est utilisé pour tenir quelqu'un en respect avec son arme, l'endurance permet de garder son arme braquée sur sa cible.",
  ],
};
export const bigGuns: SkillDefinition = {
  name: 'bigGuns',
  nom: 'Armes lourdes',
  SPECIAL: 'Endurance',
  secondarySPECIAL: ['Force', 'Agilité'],
  shortDescription: [
    'Armes lourdes est la compétence que vous utilisez quand vous maniez une arme de bonne taille.',
  ],
  description: [
    'Employez Armes lourdes pour manier des armes telles que les miniguns, les lances missiles, les Fat Man et les lasers gatling',
    "la Force pour préparer une arme, ou l'agilité si la précision devient importante.",
  ],
};
export const athletics: SkillDefinition = {
  name: 'athletics',
  nom: 'Athlétisme',
  SPECIAL: 'Force',
  secondarySPECIAL: ['Agilité', 'Endurance'],
  shortDescription: [
    'Athlétisme détermine votre capacité à mettre en application votre force ou votre agilité et à connaître vos limites durant un effort physique.',
  ],
  description: [
    'Employez Athlétisme pour pousser, tirer ou soulever un objet, pour sauter, escalader, nager ou courir.',
    "L'agilité peut être utilisé à la place de la Force, et l'endurance lorsque vous faites face à une adversité physique.",
  ],
};
export const lockpick: SkillDefinition = {
  name: 'lockpick',
  nom: 'Crochetage',
  SPECIAL: 'Perception',
  secondarySPECIAL: ['Agilité', 'Force'],
  shortDescription: [
    'Le crochetage reflète le savoir-faire en matière de manipulation de serrures afin de les ouvrir sans clé.',
  ],
  description: [
    'Employez crochetage pour ouvrir un coffre ou une porte verrouillé.',
    "L'agilité peut être utilisé à la place de la perception, la force peut être utilisé si on veut forcer la porte sans endommager la serrure.",
  ],
};
export const speech: SkillDefinition = {
  name: 'speech',
  nom: 'Éloquence',
  SPECIAL: 'Charisme',
  secondarySPECIAL: ['Intelligence', 'Perception'],
  shortDescription: [
    'Discours recouvre les techniques que vous avez apprises pour communiquer, convaincre ou mentir avec autrui',
  ],
  description: [
    'Employez Discours pour convaincre autrui de vos arguments, inspirer vos interlocuteurs ou tenter de les duper de manière convaincante.',
    "L'Intelligence pour écrire un discours, la Perception pour déterminer à quel point votre pigeon est susceptible de croire à votre mensonge.",
  ],
};
export const sneak: SkillDefinition = {
  name: 'sneak',
  nom: 'Discrétion',
  SPECIAL: 'Agilité',
  secondarySPECIAL: ['Perception', 'Intelligence'],
  shortDescription: ['Employez discrétion pour vous déplacer en silence ou rester caché.'],
  description: [
    'La compétence Discrétion recouvre le déplacement furtif et toute tentative de ne pas vous faire remarquer lorsque vous entreprenez une action physique',
    "La Perception permet de détecter des ennemis en embuscade, l'intelligence est utiliser pour partire en repérage dans un bâtiment.",
  ],
};
export const explosives: SkillDefinition = {
  name: 'explosives',
  nom: 'Explosifs',
  SPECIAL: 'Perception',
  secondarySPECIAL: ['Force', 'Agilité'],
  shortDescription: [
    'Lorsque vous lancer des explosifs, les placez pour tendre un piège ou les faites détoner à distance, vous utilisez la compétence Explosifs.',
  ],
  description: [
    'Employez Explosifs pour utilisez des mines ou des grenades à fragmentation, des cocktails Molotov, des grenades Nuka, des grenades à plasma, des grenades à impulsion, des mines ou de la dynamite.',
    "La Force est utilisée quand on veut lancer une grenade aussi loin que possible, l'Agilité permet de se rapprocher au plus près d'une mine sans la déclencher.",
  ],
};
export const unarmed: SkillDefinition = {
  name: 'unarmed',
  nom: 'Mains nues',
  SPECIAL: 'Force',
  secondarySPECIAL: ['Agilité', 'Charisme'],
  shortDescription: ['La compétence Mains nues mesure votre capacité à combattre avec vos poings'],
  description: [
    'Employez Mains nues pour attaquer lorsque vous êtes désarmé.',
    "Vous pouvez utiliser l'Agilité à la place de Force et le Charisme pour menacer ou intimider autrui.",
  ],
};
export const medicine: SkillDefinition = {
  name: 'medicine',
  nom: 'Médecine',
  SPECIAL: 'Intelligence',
  secondarySPECIAL: ['Agilité', 'Charisme'],
  shortDescription: [
    'Employez médecine pour stabiliser vos alliés au combat et soigner leurs blessures.',
  ],
  description: [
    "Médecine est la compétence qui recouvre les connaissances, et la mise en pratique de ces dernières, liées à la médecine en général, des premiers secours à la pharmacologie en passant par la chirurgie et le traitement de l'empoisonnement aux radiations.",
    "Vous pouvez utiliser l'Agilité pour opérer ou le Charisme pour conseiller un compagnon.",
  ],
};
export const pilot: SkillDefinition = {
  name: 'pilot',
  nom: 'Pilotage',
  SPECIAL: 'Perception',
  secondarySPECIAL: ['Force', 'Agilité'],
  shortDescription: [
    'Employez Pilotage pour conduire un véhicule terrestre ou piloter un véhicule aérien.',
  ],
  description: [
    'Pilotage représente toutes vos capacités de conduite de véhicules divers et variés, des buggies aux motos, en passant par les vertiptères et les tanks.',
    "Vous pouvez utiliser la Force pour retenir un buggy lorsqu'il dérape, ou agilité pour poser un vertiptère sur une zone étroite.",
  ],
};
export const throwing: SkillDefinition = {
  name: 'throwing',
  nom: 'Projectiles',
  SPECIAL: 'Agilité',
  secondarySPECIAL: ['Force', 'Perception'],
  shortDescription: [
    "Employez Projectiles pour effectuer une attaque de lancer à l'aide d'armes spécifiques.",
  ],
  description: [
    'La compétence Projectiles détermine votre capacité à réussir des attaques avec des armes de lancer telles que des javelots, des couteaux ou des armes improvisées.',
    "Vous pouvez utiliser la Force dans le cas d'objets lourds, ou Perception pour évaluer la distance jusqu'à la cible.",
  ],
};
export const repair: SkillDefinition = {
  name: 'repair',
  nom: 'Réparation',
  SPECIAL: 'Intelligence',
  secondarySPECIAL: ['Force', 'Perception'],
  shortDescription: [
    'Employez Réparation pour réparer ou modifier des armes, radistoler des robots, confectionner des objets à partir de pièces détachées ou construire des défenses.',
  ],
  description: [
    "Construire et réparer des objets, qu'il s'agisse d'armes ou de bâtiments, de pièges simples ou au mécanisme complexe, dépend de la compétence Réparation.",
    "Vous pouvez utiliser la Force pour amener une machinerie lourde à fonctionner à nouveau ou Perception pour essayer de comprendre le problème d'un moteur.",
  ],
};
export const science: SkillDefinition = {
  name: 'science',
  nom: 'Sciences',
  SPECIAL: 'Intelligence',
  secondarySPECIAL: ['Perception', 'Charisme'],
  shortDescription: [
    'Employez Science pour pirater un ordinateur, concocter des drogues et résoudre vos problèmes grâce à la science!',
  ],
  description: [
    'La compétence Science recouvre toutes les connaissances théoriques et pratiques, mais, dans les Terres désolées, elle sert surtout à coder des ordinateurs, programmer des robots et concocter des drogues.',
    "Vous pouvez utiliser Perception pour étudier un sujet-test ou Charisme pour convaincre autrui à l'aide de vos savoirs scientifiques.",
  ],
};
export const survival: SkillDefinition = {
  name: 'survival',
  nom: 'Survie',
  SPECIAL: 'Endurance',
  secondarySPECIAL: ['Perception', 'Charisme'],
  shortDescription: [
    'Employez Survie pour construire un camp ou pour tester votre résistance à la malnutrition ou à la déshydratation.',
  ],
  description: [
    "La compétence Survie recouvre toutes sortes de savoir-faire utiles dans la nature, comme la chasse, la cueillette, la pêche, la construction d'abris de fortune et l'allumage de feu.",
    'Vous pouvez utiliser Perception pour déterminer combien de temps il vous reste avant la tombée de la nuit ou Charisme pour charmer des animaux.',
  ],
};
export const barter: SkillDefinition = {
  name: 'barter',
  nom: 'Troc',
  SPECIAL: 'Charisme',
  secondarySPECIAL: ['Perception', 'Intelligence'],
  shortDescription: [
    "Employez Troc pour vendre ou acheter des objets, ou encore pour négocier le prix d'un service.",
  ],
  description: [
    "Troc représente votre talent avec l'argent: savez-vous gérer votre argent ? Faire de bonnes affaires ? Négocier une baisse de prix ?",
    "Vous pouvez utiliser Perception pour déterminer si votre interlocuteur est prêt à changer d'avis ou Intelligence pour estimer la véritable valeur d'un objet.",
  ],
};
