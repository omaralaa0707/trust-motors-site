import type { TrustContent } from "./schema-ext";
import { PROFILE } from "./media";

/** U+200E. Forces a Latin handle or hashtag to keep its leading symbol when it
 *  sits inside an Arabic sentence — without it the bidi algorithm hands the
 *  neutral "@" or "#" to the surrounding RTL run and it lands on the wrong end. */
const L = "‎";

export const ar: TrustContent = {
  locale: "ar",
  dir: "rtl",

  brand: {
    name: "تراست موتورز",
    shortName: "TM",
    tagline: "تراست موتورز · الإسكندرية",
  },

  nav: [
    { label: "المنشوران", href: "#fleet" },
    { label: "المحل", href: "#city" },
    { label: "زوروهم", href: "#contact" },
  ],

  hero: {
    eyebrow: "الإبراهيمية · الإسكندرية",
    headline: "منشوران، وطريقتان مختلفتان لبيع عربية",
    sub: `47 منشور، اتنين بس منهم بيظهروا من غير تسجيل دخول. واحد من حساب المعرض نفسه — بوستر مصمم بالكامل، وجنبه في نفس المنشور الصورة الخام من يوم التصوير. والتاني صورتين موبايل متكتب عليهم الكلام جوه فقاعة بيضا، متنشرين من حساب تاني وعليهم هاشتاج ${L}#trust_motors${L}. الاتنين مع بعض بينشروا 12 رقم ومفيش سعر.`,
    primaryCta: "اتصل بالمحل",
    secondaryCta: "اقرأ المنشورين",
    fingerprintAlt:
      "بصمة إصبع مبنية كهندسة مجسمة ثلاثية الأبعاد وبيمسحها شريط أحمر مرة كل لفة — مأخوذة من فئة سوزوكي سياز اللي المعرض نفسه بيسميها «بصمة».",
    fingerprintCaption:
      "أعلى فئة في سياز اسمها «بصمة» على اسم الدخول من غير مفتاح، والمعرض اسمه Trust. فالنتيجة: بصمة حقيقية مبنية كهندسة مجسمة مش مرسومة، وبتتمسح مرة كل لفة.",
    counts: [
      { value: PROFILE.posts, label: "منشور عندهم" },
      { value: PROFILE.postsSourced, label: "بيظهروا من غير دخول" },
      { value: "12", label: "رقم منشور" },
      { value: "0", label: "سعر منشور" },
    ],
  },

  about: { heading: "تراست موتورز", body: [] },
  services: { heading: "المنشوران", items: [] },
  gallery: { heading: "المنشوران", items: [] },

  fleet: {
    eyebrow: "المنشوران",
    heading: "كل رقم بينشروه، وهو ظاهر فين بالظبط",
    intro:
      "كل سطر عليه تاج. «كابشن» يعني المعرض هو اللي كتبه. «بوستر بس» يعني الرقم ده مش موجود في كلامهم خالص — موجود جوه التصميم لوحده. ومنشور سبورتاج مفيهوش تصميم أصلًا، عشان كده كل سطوره عليها نفس التاج. ومفيش رقم منقول من إعلان للتاني.",
    figuresLabel: "الأرقام المنشورة",
    captionLabel: "الكابشن، نصًا",
    captionNote: "منقول بالظبط زي ما اتنشر.",
    priceLabel: "عن السعر",
    viewPost: "افتح المنشور على إنستجرام",
    specLabels: {
      trim: "الفئة",
      mileage: "العداد",
      paint: "الدهان",
      maintenance: "الصيانة",
      license: "الرخصة",
      engine: "المحرك",
      transmission: "ناقل الحركة",
      keyless: "الدخول",
    },
    sourceLabels: {
      caption: "كابشن",
      poster: "بوستر بس",
    },
    cars: {
      ciaz: {
        presentedAs: "اتنشرت كتصميم دعائي",
        presentationNote:
          "مربع واحد مسطّح فيه ختمهم الدائري المسجّل، وسما مركّبة، وليستة تشيك حمرا، وشريط مواصفات بتلات أيقونات، وسطر عن السعر من غير سعر، وشريط عنوان تحت مكتوب فيه سطرهم بتاعهم — «ثقتك … أولويتنا». الفريم التاني في نفس المنشور صورة عادية لنفس العربية على الطريق وقت الغروب، وحامل الإضاءة بتاع التصوير لسه واقف على الرصيف.",
        frameCaptions: [
          "البوستر زي ما اتنشر، من غير قص.",
          "الفريم التاني من نفس المنشور: نفس العربية وقت الغروب، وحامل الإضاءة لسه مكانه.",
        ],
        figures: [
          { label: "trim", value: "أعلى فئة — بصمة", from: "caption" },
          { label: "paint", value: "فابريكا بالكامل", from: "caption" },
          { label: "mileage", value: "74,000 كم", from: "caption" },
          { label: "maintenance", value: "صيانات توكيل", from: "caption" },
          { label: "engine", value: "1600 سي سي، ياباني", from: "poster" },
          { label: "transmission", value: "أوتوماتيك", from: "poster" },
          { label: "keyless", value: "بصمة تشغيل ودخول ذكي", from: "poster" },
        ],
        priceNote:
          "السطر الوحيد عن السعر في البوستر هو «السعر مناسب جدا»، وفوقه «فرصة لا تعوض». مفيش أي رقم لا في التصميم ولا في الكابشن.",
      },
      sportage: {
        presentedAs: "اتنشرت كصورة موبايل",
        presentationNote:
          "صورتين من الموبايل على طول، كل واحدة عليها فقاعة بيضا مكتوب فيها كلام — «فابريكا بالكامل» على واحدة، والموديل والفئة على التانية. لا تمبليت ولا ختم ولا شريط مواصفات. والفريم الأول كمان هو الصورة الوحيدة للمحل نفسه في المنشورين.",
        frameCaptions: [
          "واقفة قدام المحل بتاعهم، والكابشن متكتب على الصورة.",
          "من الأمام على نفس الشارع، وفقاعة كابشن تانية.",
        ],
        figures: [
          { label: "trim", value: "أعلى فئة", from: "caption" },
          { label: "paint", value: "فابريكا بالكامل", from: "caption" },
          { label: "maintenance", value: "صيانات توكيل", from: "caption" },
          { label: "mileage", value: "84,000 كم", from: "caption" },
          { label: "license", value: "رخصة سنتين", from: "caption" },
        ],
        note: `اتنشرت من حساب تالت، ${L}@megaheeed${L}، وعليها هاشتاج ${L}#trust_motors${L} — مش من حساب المعرض نفسه. والرقم اللي في الكابشن رقم المعرض.`,
      },
    },
  },

  city: {
    eyebrow: "الإسكندرية",
    heading: "أول معرض من الإسكندرية في السلسلة دي",
    body: [
      "كل معرض اتبنى قبل ده بيتاجر من القاهرة الكبرى — القاهرة على ضفة والجيزة على التانية. تراست موتورز أول واحد من الإسكندرية، بيشتغل من محل واحد في شارع سكني بالإبراهيمية، قدام فرع ريفيرا لسوبر ماركت فتح الله.",
      "المحل ده بيظهر مرة واحدة بس في المنشورين اللي بيظهروا، في ركن صورة اتنشرت من حساب حد تاني. وهو كمان المكان الوحيد اللي فيه حاجتين من الحاجات اللي بينشروها: الخط الأرضي، والسطر اللي بيقول الشغل بيشتغل إيه بالظبط.",
    ],
    signAlt:
      "واجهة تراست موتورز في الإبراهيمية: حروف حمرا بارزة مكتوب فيها TRUST MOTORS على لافتة رمادي، وختم دائري على الطرف الشمال، والخط الأرضي جنبه، وسطر النشاط بالعربي تحت.",
    signCaption:
      "واجهة المحل، مقصوصة من أول فريم في منشور سبورتاج. وش واحد من المارة اتعمله بلور.",
    signLabel: "اللي مكتوب على اللافتة",
    signLines: [
      { label: "الاسم", value: "TRUST MOTORS" },
      { label: "النشاط", value: "بيع · شراء · استبدال لحساب الغير" },
      { label: "الأرضي", value: PROFILE.landline },
      { label: "الختم", value: "TRUST MOTORS · ALEXANDRIA · 03/4282000" },
    ],
  },

  contact: {
    heading: "زوروهم",
    addressLabel: "العنوان",
    address: "الإبراهيمية، أمام فتح الله ريفيرا، الإسكندرية",
    landlineLabel: "أرضي المحل",
    landlineSource: "على اللافتة وعلى ختم البوستر. مش موجود في البايو خالص.",
    partnersLabel: "الخطوط المباشرة",
    partnersSource: "منشورة في البايو.",
    partners: [
      { name: "م/عصام", phone: PROFILE.partner1.phone },
      { name: "م/محمد", phone: PROFILE.partner2.phone },
    ],
    phoneLabel: "التليفون",
    phones: [PROFILE.partner1.phone, PROFILE.partner2.phone],
    mapsUrl: PROFILE.maps,
    mapsLabel: "خرائط جوجل",
    instagramUrl: PROFILE.instagram,
    note: "المنشورين بيدوا رقم واحد بس من الاتنين — 01144606008 — بما فيهم اللي اتنشر من حساب تاني.",
    cta: "اتصل بالمحل",
  },

  footer: {
    disclaimer:
      "تصميم مفاهيمي اتعمل كعرض توضيحي. مش موقع رسمي لتراست موتورز وغير تابع ليهم. كل الصور والعلامات والنصوص المقتبسة ملك لتراست موتورز؛ الكابشنات منقولة بالظبط زي ما اتنشرت، ووش اتنين من المارة اتعملهم بلور.",
    rights: "تصميم بواسطة Claude",
  },

  a11y: {
    toggleLanguage: "Switch to English",
    openMenu: "افتح القائمة",
    closeMenu: "أغلق القائمة",
  },
};
