'use client'

import { Phone, Mail } from 'lucide-react'
import { FaWhatsapp, FaFacebookF, FaInstagram } from 'react-icons/fa'
import { SiGooglemaps } from 'react-icons/si'
import Image from 'next/image'

export function TopHeader() {
  return (
    <div className="bg-white border-b border-slate-100 text-slate-600 text-[11px] py-1.5 px-4 hidden md:block">
      <div className="max-w-7xl mx-auto grid grid-cols-3 items-center">
        <div className="flex items-center gap-6 font-bold">
          <a href="https://wa.me/51966600891" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-[#158cca] transition-colors">
            <FaWhatsapp size={14} className="text-[#158cca]" /> +51 966 600 891
          </a>
          <a href="mailto:info@sanluismedic.pe" className="flex items-center gap-2 hover:text-[#158cca] transition-colors">
            <Mail size={14} className="text-[#158cca]" /> info@sanluismedic.pe
          </a>
        </div>

        <div className="flex justify-center">
          <Image
            src="/Banner horizonal MTC.webp"
            alt="MTC Banner"
            width={300}
            height={20}
            sizes="300px"
            loading="lazy"
            decoding="async"
            className="h-6 w-auto object-contain"
          />
        </div>

        <div className="flex items-center justify-end gap-4 border-l border-slate-200 pl-4">
          <a href="#" className="hover:text-[#158cca] transition-colors text-slate-400"><FaFacebookF size={14} /></a>
          <a href="#" className="hover:text-[#158cca] transition-colors text-slate-400"><FaInstagram size={14} /></a>
          <a href="#" className="hover:text-[#158cca] transition-colors text-slate-400"><SiGooglemaps size={14} /></a>
        </div>
      </div>
    </div>
  )
}
