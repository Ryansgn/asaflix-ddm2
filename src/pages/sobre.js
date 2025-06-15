// src/pages/Sobre.js
import React from 'react';
import bannerImage from '../img/4.png'; // caminho para seu banner
import '@fontsource/montserrat';

function Sobre() {
  return (
    <div>
      {/* Banner */}
      <div
        style={{
          width: '80%',
          maxWidth: '600px',
          margin: '1rem auto 0.5rem',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        }}
      >
        <img
          src={bannerImage}
          alt="Banner AsaFLIX"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
          }}
        />
      </div>

      {/* Conteúdo */}
      <div style={{ padding: '1.5rem', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h1>Sobre o AsaCLICK</h1>
        <p>
          Este é um projeto fictício de streaming criado para fins de aprendizado, desenvolvido pela equipe AsaCLICK - 3° Info.
        </p>

        <h2 style={{ marginTop: '2rem' }}>Nossa Equipe</h2>
        <ul style={{ listStyle: 'none', padding: 0, fontSize: '1.1rem' }}>
          <li>Daniella Pereira</li>
          <li>Fabricio Bezerra</li>
          <li>Mariana Coutinho</li>
          <li>Ryan Soares</li>
        </ul>
      </div>
    </div>
  );
}

export default Sobre;
