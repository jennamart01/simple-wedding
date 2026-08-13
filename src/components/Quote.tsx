import React from 'react';
import styles from './Quote.module.css';
import SectionOrnaments from './SectionOrnaments';


const Quote: React.FC = () => {
  return (
    <section className={styles.quote}>
      <SectionOrnaments />
      <div className={styles.container}>
        <p className={styles.arabic}>وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُمْ مِنْ أَنْفُسِكُمْ أَزْوَاجًا لِتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِقَوْمٍ يَتَفَكَّرُونَ</p>
        <p className={styles.translation}>
          "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir."
        </p>
        <p className={styles.reference}>(QS. Ar-Rum: 21)</p>
      </div>
    </section>
  );
};

export default Quote;
