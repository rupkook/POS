import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../component/SEO';
import HeaderTopBang from '../component/HeaderTopBang';
import HeaderBang from '../component/HeaderBang';
import HeroBang from '../component/HeroBang';
import EcosystemBang from '../component/EcosystemBang';
import FeaturesBang from '../component/FeaturesBang';
import ComparisonBang from '../component/ComparisonBang';
import TestimonialsBang from '../component/TestimonialsBang';
import ExpertBang from '../component/ExpertBang';
import FaqBang from '../component/FaqBang';
import CtaBang from '../component/CtaBang';
import FooterBang from '../component/FooterBang';
import ContactUsBang from '../component/ContactUsBang';

export default function HomeBang() {
    return (
        <motion.div
            className="bg-[var(--bg-color)] min-h-screen font-sans overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <SEO 
                title="হোম" 
                description="Markt POS হলো গ্রোসারি স্টোর, সুপারমার্কেট এবং স্পেশালিটি মার্কেটের জন্য বিশেষভাবে ডিজাইন করা সেরা পয়েন্ট অফ সেল সিস্টেম।" 
                keywords="পস, পয়েন্ট অফ সেল, গ্রোসারি স্টোর পস, রিটেইল সফটওয়্যার, Markt POS, ক্যাশ রেজিস্টার"
            />
            <HeaderTopBang />
            <HeaderBang />
            <main>
                <HeroBang />
                <EcosystemBang />
                <FeaturesBang />
                <ComparisonBang />
                <TestimonialsBang />
                <ExpertBang />
                <FaqBang />
                <CtaBang />
                <ContactUsBang />
            </main>
            <FooterBang />
        </motion.div>
    );
}