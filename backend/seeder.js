const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const Content = require('./models/Content');
const Service = require('./models/Service');
const Project = require('./models/Project');
const Blog = require('./models/Blog');
const { Testimonial } = require('./models/TestimonialAndPartner');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const seedData = async () => {
    try {
        await User.deleteMany();
        await Service.deleteMany();
        await Project.deleteMany();

        await Blog.deleteMany();
        await Content.deleteMany();
        await Testimonial.deleteMany();

        // 0. Seed Testimonials (from Frontend)
        const testimonials = [
            { name: "Rovana", title: "Clothing (Brand)", text: "بنتعامل معاهم من زمان فعلآ شركه ممتازة جدآ البشمهندس محمد حد فوق المحترم بشويه بجد ❤️ ❤️" },
            { name: "Nada ibrahim", title: "makeup artist", text: "بعمل معاهم إعلانات شاطرين اوي بجد ❤️❤️" },
            { name: "الامام", title: "لقطع غيار سيارات", text: "بتعامل معاهم فعلآ من زمان وناس عندها مصداقيه في التعامل وأهم حاجه إنك بتلاقي متابعه مستمره" },
            { name: "المعتصم", title: "مصنع ملابس", text: "بنتعامل معاهم في الإعلانات ملابس جمله فعلآ ناس عندها مصداقيه في التعامل البشمهندس محمد صاحب الشركه حد شاطر اوي وزوق" },
            { name: "اليسر جروب", title: "شركة توظيف و توريد عمالة", text: "شركه تسويق عندها مصداقيه فعلآ في التعامل ودي اهم حاجه ونتائج الإعلانات فعلا مختلفه تمامآ عن أي حد بيعمل اعلانات برشح فعلآ تتعاملوا معاها 👏" },
            { name: "Elbaz Furniture", title: "", text: "حقيقي من أحسن شركات التسويق في مصر بالنسبالي 🌟\nوالفكره إن التيم بالكامل فاهم اوي يعني اي تسويق بجد\nوالأهم انهم مش بيهتموا بالرسالة\nقد مايهمهم حجم المبيعات وعملوا الويب سايت والحمد لله بقالنا أكثر من سنتين مع بعض بجد شكرآ ليكوا 👏👏" },
            { name: "الفهد", title: "مصنع ملابس", text: "بنتعامل معاهم بقالنا فتره كبيره\nوالحمد لله من الناس المحترمه في الإعلانات والنتائج ممتاز اللهم بارك والتيم كله متعاون" },
            { name: "الروميساء للعبايات", title: "", text: "بقالنا معاهم حوالي 5 سنين 🌟🌟\nوهما حقيقي شركه ممتازة في التعامل\nالتيم في قمه الاحترام والاحترافيه\nفاهمين تسويق صح وأهم حاجه بيتابعوا معاااك شبه يوميآ\nوالمبيعات بسم الله ماشاء الله كويسزه معاهم جدآ 🙏🙏" },
            { name: "Henna's Secret", title: "", text: "تعامل دائم 3 سنين\nمن اول الاعلانات لحد بناء السايت و افكار تنمي البيزنس\nغير الامانه و المتابعه\nو استاذ محمد حقيقي محترم جدا و امين" },
            { name: "حاتم جمال أبو سليم", title: "", text: "طب يلا نودي حمله زي بتاعت الشهر الفات ولا اي\nاخر حمله كانت ماشالله تبارك الرحمن فوق التوقعات\nشكرا ليكم بجد ❤️❤️" },
            { name: "Abdallah Hassaan", title: "", text: "ناس محترمين وشغلكم بيتكلم عنكم ❤️🔥" },
            { name: "Haytham Abdelmogheth", title: "", text: "ناس محترمة وتعامل راقي علي كل المستويات" },
            { name: "جنى علي", title: "blogger", text: "مبسوطه جدًا من الشغل اللي قدمتوه. شكرا على المجهود." },
            { name: "Mohamed Abd Krim", title: "", text: "والله مصداقيه وشركه محترمه وتصميمات جميله حاجه حديثه جميله قوي يعني بصراحه والتيم اللي بتتعامل معاه تيم كويس ومعاك خطوه بخطوه ولحظه بلحظه ♥️♥️♥️🥰🥰" },
            { name: "Sameh Mostafa Gaweesh", title: "", text: "من افضل الناس ال الواحد اتعامل معاهم حاجه محترمه جدا 💕💕" },
            { name: "مروان شريف", title: "", text: "اتقان في الشغل واهتمام بالتفاصيل.. شيء نادر دلوقتي." },
            { name: "رنا إبراهيم", title: "Project Manager", text: "الفريق متعاون جدًا وبيشرح كل خطوة بوضوح." },
            { name: "حسن عطية", title: "", text: "تجربة ممتازة من أول مكالمة لحد استلام النتائج." },
            { name: "منى عادل", title: "صاحبة بيزنس صغير", text: "ساعدوني أبدأ من الصفر ووصلوني لأول 100 عميل." },
            { name: "كريم عبد الله", title: "", text: "مافيش لفظ يوفّق حجم الشغل اللي قدمتوه، بجد شكرًا." }
        ];
        await Testimonial.insertMany(testimonials);
        console.log('✅ Testimonials Created');

        // 1. Create Default Content (Header)
        const headerContent = [
            { section: 'header', key: 'title', value: 'نضع البيانات في قلب كل قرار ونبني استراتيجيات' },
            { section: 'header', key: 'subtitle', value: 'قابلة للقياس تحقق نموًا حقيقيًا لأعمالك. تنفيذنا دقيق ومتكامل — من استهداف الجمهور وصياغة الرسائل إلى إدارة الحملات وتحليل الأداء — مع دورات تحسين مستمرة تُقلّل تكلفة الاكتساب وتضاعف عائد الاستثمار.' }
        ];
        await Content.insertMany(headerContent);
        console.log('✅ Content Created');

        // 2. Create Admin
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin123', salt);

        await User.create({
            email: 'admin@example.com',
            password: hashedPassword,
            role: 'admin'
        });
        console.log('✅ Admin Created: admin@example.com / admin123');

        // 2. Create Services
        const services = [
            {
                title: 'SEO Optimization',
                description: 'Boost your visibility and rank higher on search engines with our expert SEO strategies.',
                icon: 'FaSearch',
                image: 'https://images.unsplash.com/photo-1572435555641-71329a674404?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
            },
            {
                title: 'Social Media Marketing',
                description: 'Engage your audience and build your brand presence across all major social platforms.',
                icon: 'FaShareAlt',
                image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
            },
            {
                title: 'Content Creation',
                description: 'High-quality content that resonates with your audience and drives conversions.',
                icon: 'FaPenNib',
                image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
            }
        ];
        await Service.insertMany(services);
        console.log('✅ Services Created');

        // 3. Create Projects
        const projects = [
            {
                title: 'TechStartup Rebrand',
                description: 'Complete visual identity overhaul for a rising tech unicorn.',
                images: ['https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80']
            },
            {
                title: 'Fashion Week Campaign',
                description: 'Digital viral campaign for a luxury fashion house.',
                images: ['https://images.unsplash.com/photo-1505322022379-7c3353ee6291?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80']
            },
            {
                title: 'EcoFriendly Launch',
                description: 'Product launch strategy for a sustainable good brand.',
                images: ['https://images.unsplash.com/photo-1416879895691-142ea6201251?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80']
            }
        ];
        await Project.insertMany(projects);
        console.log('✅ Projects Created');

        // 4. Create Blogs
        // 4. Create Blogs (Restoring original 5 topics)
        const blogs = [
            {
                title: 'تيك توك وواتساب للأعمال: أدوات جديدة لزيادة التحويلات وتوسيع قاعدة العملاء',
                slug: 'tiktok-whatsapp-business',
                content: 'تيك توك وواتساب أصبحا من أهم أدوات التسويق الحديثة...',
                coverImage: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
            },
            {
                title: 'التجارة الإلكترونية في مصر 2026: استغلال الفرص وتجاوز التحديات اللوجستية',
                slug: 'ecommerce-egypt-2026',
                content: 'السوق المصري ينمو بسرعة هائلة في مجال التجارة الإلكترونية...',
                coverImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
            },
            {
                title: 'ما وراء الأرقام: كيف تُستخدم تحليلات البيانات في بناء شخصية العميل (Buyer Persona)؟',
                slug: 'beyond-numbers-data-analytics',
                content: 'البيانات ليست مجرد أرقام، بل هي مفتاح فهم سلوك العميل...',
                coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
            },
            {
                title: 'ملخص مؤتمر DigiMarCon North Africa 2025: أبرز الاتجاهات التي شكلت مستقبل الديجيتال ماركتنج',
                slug: 'digimarcon-2025-summary',
                content: 'أبرز ما جاء في المؤتمر من تقنيات واستراتيجيات جديدة...',
                coverImage: 'https://images.unsplash.com/photo-1544531696-6014cd4a938c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
            },
            {
                title: 'ثورة الذكاء الاصطناعي: كيف يغير الـ AI قواعد اللعبة في استراتيجيات المحتوى؟',
                slug: 'ai-content-strategy-revolution',
                content: 'الذكاء الاصطناعي لم يعد خياراً، بل ضرورة في صناعة المحتوى...',
                coverImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
            }
        ];
        await Blog.insertMany(blogs);
        console.log('✅ Blogs Created');

        console.log('🎉 Data Imported Successfully');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedData();
