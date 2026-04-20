'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import PageHero from '@/components/PageHero';
import { CONTACTA } from '@/lib/constants';
import { fadeInUp, staggerContainer } from '@/lib/animations';

export default function ContactoContent() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main id="main-content">
      <PageHero
        number="06"
        label="CONTACTO"
        title={CONTACTA.title}
        subtitle={CONTACTA.paragraphs[0]}
        world="artesano"
      />

      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24" style={{ backgroundColor: '#F3ECEB' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Form */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {submitted ? (
                <motion.div
                  className="py-16 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h3 className="font-artesano italic text-3xl" style={{ color: '#8C7732' }}>
                    Gracias por tu mensaje
                  </h3>
                  <p className="font-body text-base mt-4" style={{ color: '#002A3A', opacity: 0.7 }}>
                    Nos pondremos en contacto contigo lo antes posible.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div variants={fadeInUp}>
                    <label className="font-ingeniero text-[10px] tracking-[0.2em] uppercase block mb-2" style={{ color: '#8C7732' }}>
                      Nombre
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full bg-transparent border-b border-[#8C7732]/20 py-3 font-body text-base outline-none transition-colors focus:border-[#8C7732]"
                      style={{ color: '#002A3A' }}
                    />
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <label className="font-ingeniero text-[10px] tracking-[0.2em] uppercase block mb-2" style={{ color: '#8C7732' }}>
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full bg-transparent border-b border-[#8C7732]/20 py-3 font-body text-base outline-none transition-colors focus:border-[#8C7732]"
                      style={{ color: '#002A3A' }}
                    />
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <label className="font-ingeniero text-[10px] tracking-[0.2em] uppercase block mb-2" style={{ color: '#8C7732' }}>
                      Empresa / Estudio
                    </label>
                    <input
                      type="text"
                      value={formState.company}
                      onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                      className="w-full bg-transparent border-b border-[#8C7732]/20 py-3 font-body text-base outline-none transition-colors focus:border-[#8C7732]"
                      style={{ color: '#002A3A' }}
                    />
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <label className="font-ingeniero text-[10px] tracking-[0.2em] uppercase block mb-2" style={{ color: '#8C7732' }}>
                      Tipo de proyecto
                    </label>
                    <select
                      value={formState.projectType}
                      onChange={(e) => setFormState({ ...formState, projectType: e.target.value })}
                      className="w-full bg-transparent border-b border-[#8C7732]/20 py-3 font-body text-base outline-none transition-colors focus:border-[#8C7732] appearance-none"
                      style={{ color: '#002A3A' }}
                    >
                      <option value="">Seleccionar...</option>
                      <option value="hospitality">Hospitality</option>
                      <option value="residencial">Residencial</option>
                      <option value="gastronomia">Gastronomía</option>
                      <option value="contract">Contract</option>
                      <option value="otro">Otro</option>
                    </select>
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <label className="font-ingeniero text-[10px] tracking-[0.2em] uppercase block mb-2" style={{ color: '#8C7732' }}>
                      Mensaje
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full bg-transparent border-b border-[#8C7732]/20 py-3 font-body text-base outline-none transition-colors focus:border-[#8C7732] resize-none"
                      style={{ color: '#002A3A' }}
                    />
                  </motion.div>

                  <motion.div variants={fadeInUp} className="pt-4">
                    <button
                      type="submit"
                      className="cta-fill inline-flex items-center justify-center px-12 py-5 font-artesano italic text-xl tracking-wide transition-colors duration-500 w-full md:w-auto"
                      style={{ color: '#8C7732' }}
                      data-cursor="precision"
                    >
                      Enviar mensaje
                    </button>
                  </motion.div>
                </form>
              )}
            </motion.div>

            {/* Contact Info */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.p
                className="font-body text-base md:text-lg leading-relaxed"
                style={{ color: '#002A3A', opacity: 0.85 }}
                variants={fadeInUp}
              >
                {CONTACTA.paragraphs[1]}
              </motion.p>

              <motion.div className="mt-12 space-y-8" variants={fadeInUp}>
                <div>
                  <h3 className="font-ingeniero text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: '#8C7732' }}>
                    Email
                  </h3>
                  <a
                    href={`mailto:${CONTACTA.contact.email}`}
                    className="font-body text-lg transition-opacity hover:opacity-100"
                    style={{ color: '#002A3A', opacity: 0.7 }}
                  >
                    {CONTACTA.contact.email}
                  </a>
                </div>

                <div>
                  <h3 className="font-ingeniero text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: '#8C7732' }}>
                    Teléfono
                  </h3>
                  <a
                    href={`tel:${CONTACTA.contact.phone.replace(/\s/g, '')}`}
                    className="font-body text-lg transition-opacity hover:opacity-100"
                    style={{ color: '#002A3A', opacity: 0.7 }}
                  >
                    {CONTACTA.contact.phone}
                  </a>
                </div>

                <div>
                  <h3 className="font-ingeniero text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: '#8C7732' }}>
                    Ubicación
                  </h3>
                  <p className="font-body text-lg" style={{ color: '#002A3A', opacity: 0.7 }}>
                    {CONTACTA.contact.location}
                  </p>
                </div>

                <div>
                  <h3 className="font-ingeniero text-[10px] tracking-[0.2em] uppercase mb-4" style={{ color: '#8C7732' }}>
                    Redes sociales
                  </h3>
                  <div className="flex gap-8">
                    <a
                      href={CONTACTA.contact.social.instagram}
                      className="font-ingeniero text-[11px] tracking-[0.2em] uppercase transition-opacity hover:opacity-100"
                      style={{ color: '#002A3A', opacity: 0.5 }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Instagram
                    </a>
                    <a
                      href={CONTACTA.contact.social.linkedin}
                      className="font-ingeniero text-[11px] tracking-[0.2em] uppercase transition-opacity hover:opacity-100"
                      style={{ color: '#002A3A', opacity: 0.5 }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Map placeholder */}
              <motion.div
                className="mt-12 aspect-[4/3] relative overflow-hidden"
                variants={fadeInUp}
              >
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #F3ECEB 0%, #F3ECEB 100%)' }}
                >
                  <div className="text-center">
                    <p className="font-ingeniero text-[11px] tracking-[0.2em] uppercase" style={{ color: '#002A3A', opacity: 0.5 }}>
                      Valencia, España
                    </p>
                    <p className="font-body text-sm mt-2" style={{ color: '#002A3A', opacity: 0.3 }}>
                      39.4699° N, 0.3763° W
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
