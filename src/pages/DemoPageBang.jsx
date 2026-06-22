import HeaderTopBang from '../component/HeaderTopBang';
import HeaderBang from '../component/HeaderBang';
import FooterBang from '../component/FooterBang';
import DemoFormBang from '../component/DemoFormBang';
import { motion } from 'framer-motion';
import SEO from '../component/SEO';

export default function DemoPageBang() {
    return (
        <motion.div 
            className="bg-[var(--bg-color)] min-h-screen flex flex-col font-sans"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <SEO 
                title="ডেমোর জন্য অনুরোধ করুন" 
                description="একটি ফ্রি, ব্যক্তিগতকৃত ডেমো পান এবং দেখুন কিভাবে Markt POS আপনার গ্রোসারি স্টোরের কার্যক্রম সুষ্ঠু করতে পারে।" 
                keywords="পস ডেমো, Markt POS ডেমো, পয়েন্ট অফ সেল ট্রায়াল, গ্রোসারি পস ডেমো"
            />
            <HeaderTopBang />
            <HeaderBang />

            <main className="flex-grow py-10 sm:py-16 lg:py-20">
                <DemoFormBang />
            </main>

            <FooterBang />
        </motion.div>
    );
}