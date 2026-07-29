import { SpecialKey } from '../../character/models/special.type';
import { SKILL_IMAGES } from '../component/image/skill.images';
import { SrcImage } from '../models/src-image.model';

export const SKILL_KEYS = [
  'athletics',
  'barter',
  'bigGuns',
  'energyWeapons',
  'explosives',
  'lockpick',
  'medicine',
  'meleeWeapons',
  'pilot',
  'repair',
  'science',
  'smallGuns',
  'sneak',
  'speech',
  'survival',
  'throwing',
  'unarmed',
] as const;

export type SkillKey = (typeof SKILL_KEYS)[number];

export interface SkillInfo {
  key: SkillKey;
  label: string;
  special: SpecialKey;
  secondarySpecial: SpecialKey[];
  shortDescription: string;
  description: string[];
  image: SrcImage;
}

export const SKILL_DATA: SkillInfo[] = [
  {
    key: 'energyWeapons',
    label: 'Armes à énergie',
    special: 'perception',
    secondarySpecial: ['intelligence', 'agility'],
    shortDescription:
      'Armes à énergie est la compétence que vous utilisez quand vous maniez une arme à énergie.',
    description: [
      "Armes à énergie est la compétence que vous utilisez quand vous maniez les pistolets laser, les pistolets à plasma, les armes de Gauss ou toute autre arme qui tire un trait d'énergie.",
      "L'intelligence permet de modifier ou/et de réparer les armes, l'agilité permet de désamorcer un piège impliquant une arme à énergie.",
    ],
    image: SKILL_IMAGES.energyWeapons,
  },
  {
    key: 'meleeWeapons',
    label: 'Armes de corps à corps',
    special: 'strength',
    secondarySpecial: ['agility', 'charisma'],
    shortDescription:
      'Arme de corps à corps est la compétence que vous utilisez quand vous maniez une arme de corps à corps.',
    description: [
      'Elle permet d’infliger des dégâts et dévier les coups avec des armes de corps à corps de tout type.',
      "L'agilité permet de parer une attaque au corps à corps, le Charisme permet de menacer quelqu'un.",
    ],
    image: SKILL_IMAGES.meleeWeapons,
  },
  {
    key: 'smallGuns',
    label: 'Armes légères',
    special: 'agility',
    secondarySpecial: ['charisma', 'endurance'],
    shortDescription:
      'Armes légères est la compétence que vous utilisez quand vous maniez une arme légère.',
    description: [
      'La compétence Armes légères mesure votre précision avec les armes à un coup, les pistolets automatiques, les fusils et les fusils à pompe, ainsi que vos connaissances pratiques en la matière.',
      "Le Charisme est utilisé pour tenir quelqu'un en respect avec son arme, l'endurance permet de garder son arme braquée sur sa cible.",
    ],
    image: SKILL_IMAGES.smallGuns,
  },
  {
    key: 'bigGuns',
    label: 'Armes lourdes',
    special: 'endurance',
    secondarySpecial: ['strength', 'agility'],
    shortDescription:
      'Armes lourdes est la compétence que vous utilisez quand vous maniez une arme de bonne taille.',
    description: [
      'Employez Armes lourdes pour manier des armes telles que les miniguns, les lance-missiles, les Fat Man et les lasers gatling.',
      "La Force pour préparer une arme, ou l'agilité si la précision devient importante.",
    ],
    image: SKILL_IMAGES.bigGuns,
  },
  {
    key: 'athletics',
    label: 'Athlétisme',
    special: 'strength',
    secondarySpecial: ['agility', 'endurance'],
    shortDescription:
      'Athlétisme détermine votre capacité à mettre en application votre force ou votre agilité et à connaître vos limites durant un effort physique.',
    description: [
      'Employez Athlétisme pour pousser, tirer ou soulever un objet, pour sauter, escalader, nager ou courir.',
      "L'agilité peut être utilisée à la place de la Force, et l'endurance lorsque vous faites face à une adversité physique.",
    ],
    image: SKILL_IMAGES.athletics,
  },
  {
    key: 'lockpick',
    label: 'Crochetage',
    special: 'perception',
    secondarySpecial: ['agility', 'strength'],
    shortDescription:
      'Le crochetage reflète le savoir-faire en matière de manipulation de serrures afin de les ouvrir sans clé.',
    description: [
      'Employez crochetage pour ouvrir un coffre ou une porte verrouillée.',
      "L'agilité peut être utilisée à la place de la perception, la force peut être utilisée si on veut forcer la porte sans endommager la serrure.",
    ],
    image: SKILL_IMAGES.lockpick,
  },
  {
    key: 'speech',
    label: 'Éloquence',
    special: 'charisma',
    secondarySpecial: ['intelligence', 'perception'],
    shortDescription:
      'Discours recouvre les techniques que vous avez apprises pour communiquer, convaincre ou mentir avec autrui.',
    description: [
      'Employez Discours pour convaincre autrui de vos arguments, inspirer vos interlocuteurs ou tenter de les duper de manière convaincante.',
      "L'Intelligence pour écrire un discours, la Perception pour déterminer à quel point votre pigeon est susceptible de croire à votre mensonge.",
    ],
    image: SKILL_IMAGES.speech,
  },
  {
    key: 'sneak',
    label: 'Discrétion',
    special: 'agility',
    secondarySpecial: ['perception', 'intelligence'],
    shortDescription: 'Employez discrétion pour vous déplacer en silence ou rester caché.',
    description: [
      'La compétence Discrétion recouvre le déplacement furtif et toute tentative de ne pas vous faire remarquer lorsque vous entreprenez une action physique.',
      "La Perception permet de détecter des ennemis en embuscade, l'intelligence est utilisée pour partir en repérage dans un bâtiment.",
    ],
    image: SKILL_IMAGES.sneak,
  },
  {
    key: 'explosives',
    label: 'Explosifs',
    special: 'perception',
    secondarySpecial: ['strength', 'agility'],
    shortDescription:
      'Lorsque vous lancez des explosifs, les placez pour tendre un piège ou les faites détoner à distance, vous utilisez la compétence Explosifs.',
    description: [
      'Employez Explosifs pour utiliser des mines ou des grenades à fragmentation, des cocktails Molotov, des grenades Nuka, des grenades à plasma, des grenades à impulsion ou de la dynamite.',
      "La Force est utilisée quand on veut lancer une grenade aussi loin que possible, l'Agilité permet de se rapprocher au plus près d'une mine sans la déclencher.",
    ],
    image: SKILL_IMAGES.explosives,
  },
  {
    key: 'unarmed',
    label: 'Mains nues',
    special: 'strength',
    secondarySpecial: ['agility', 'charisma'],
    shortDescription: 'La compétence Mains nues mesure votre capacité à combattre avec vos poings.',
    description: [
      'Employez Mains nues pour attaquer lorsque vous êtes désarmé.',
      "Vous pouvez utiliser l'Agilité à la place de la Force et le Charisme pour menacer ou intimider autrui.",
    ],
    image: SKILL_IMAGES.unarmed,
  },
  {
    key: 'medicine',
    label: 'Médecine',
    special: 'intelligence',
    secondarySpecial: ['agility', 'charisma'],
    shortDescription:
      'Employez médecine pour stabiliser vos alliés au combat et soigner leurs blessures.',
    description: [
      "Médecine est la compétence qui recouvre les connaissances, et la mise en pratique de ces dernières, liées à la médecine en général, des premiers secours à la pharmacologie en passant par la chirurgie et le traitement de l'empoisonnement aux radiations.",
      "Vous pouvez utiliser l'Agilité pour opérer ou le Charisme pour conseiller un compagnon.",
    ],
    image: SKILL_IMAGES.medicine,
  },
  {
    key: 'pilot',
    label: 'Pilotage',
    special: 'perception',
    secondarySpecial: ['strength', 'agility'],
    shortDescription:
      'Employez Pilotage pour conduire un véhicule terrestre ou piloter un véhicule aérien.',
    description: [
      'Pilotage représente toutes vos capacités de conduite de véhicules divers et variés, des buggies aux motos, en passant par les vertiptères et les tanks.',
      "Vous pouvez utiliser la Force pour retenir un buggy lorsqu'il dérape, ou l'Agilité pour poser un vertiptère sur une zone étroite.",
    ],
    image: SKILL_IMAGES.pilot,
  },
  {
    key: 'throwing',
    label: 'Projectiles',
    special: 'agility',
    secondarySpecial: ['strength', 'perception'],
    shortDescription:
      "Employez Projectiles pour effectuer une attaque de lancer à l'aide d'armes spécifiques.",
    description: [
      'La compétence Projectiles détermine votre capacité à réussir des attaques avec des armes de lancer telles que des javelots, des couteaux ou des armes improvisées.',
      "Vous pouvez utiliser la Force dans le cas d'objets lourds, ou la Perception pour évaluer la distance jusqu'à la cible.",
    ],
    image: SKILL_IMAGES.throwing,
  },
  {
    key: 'repair',
    label: 'Réparation',
    special: 'intelligence',
    secondarySpecial: ['strength', 'perception'],
    shortDescription:
      'Employez Réparation pour réparer ou modifier des armes, raccommoder des robots, confectionner des objets à partir de pièces détachées ou construire des défenses.',
    description: [
      "Construire et réparer des objets, qu'il s'agisse d'armes ou de bâtiments, de pièges simples ou au mécanisme complexe, dépend de la compétence Réparation.",
      "Vous pouvez utiliser la Force pour amener une machinerie lourde à fonctionner à nouveau ou la Perception pour essayer de comprendre le problème d'un moteur.",
    ],
    image: SKILL_IMAGES.repair,
  },
  {
    key: 'science',
    label: 'Sciences',
    special: 'intelligence',
    secondarySpecial: ['perception', 'charisma'],
    shortDescription:
      'Employez Science pour pirater un ordinateur, concocter des drogues et résoudre vos problèmes grâce à la science !',
    description: [
      'La compétence Science recouvre toutes les connaissances théoriques et pratiques, mais, dans les Terres désolées, elle sert surtout à coder des ordinateurs, programmer des robots et concocter des drogues.',
      "Vous pouvez utiliser la Perception pour étudier un sujet-test ou le Charisme pour convaincre autrui à l'aide de vos savoirs scientifiques.",
    ],
    image: SKILL_IMAGES.science,
  },
  {
    key: 'survival',
    label: 'Survie',
    special: 'endurance',
    secondarySpecial: ['perception', 'charisma'],
    shortDescription:
      'Employez Survie pour construire un camp ou pour tester votre résistance à la malnutrition ou à la déshydratation.',
    description: [
      "La compétence Survie recouvre toutes sortes de savoir-faire utiles dans la nature, comme la chasse, la cueillette, la pêche, la construction d'abris de fortune et l'allumage de feu.",
      'Vous pouvez utiliser la Perception pour déterminer combien de temps il vous reste avant la tombée de la nuit ou le Charisme pour charmer des animaux.',
    ],
    image: SKILL_IMAGES.survival,
  },
  {
    key: 'barter',
    label: 'Troc',
    special: 'charisma',
    secondarySpecial: ['perception', 'intelligence'],
    shortDescription:
      "Employez Troc pour vendre ou acheter des objets, ou encore pour négocier le prix d'un service.",
    description: [
      "Troc représente votre talent avec l'argent : savez-vous gérer votre argent ? Faire de bonnes affaires ? Négocier une baisse de prix ?",
      "Vous pouvez utiliser la Perception pour déterminer si votre interlocuteur est prêt à changer d'avis ou l'Intelligence pour estimer la véritable valeur d'un objet.",
    ],
    image: SKILL_IMAGES.barter,
  },
];

export const SKILL_DATA_MAP: Record<SkillKey, SkillInfo> = SKILL_DATA.reduce(
  (acc, skill) => {
    acc[skill.key] = skill;
    return acc;
  },
  {} as Record<SkillKey, SkillInfo>,
);
