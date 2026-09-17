import styles from './FilterSidebar.module.css';

export function FilterSidebar() {
  const categories = ['All Bags', 'Tote Bags', 'Crossbody Bags', 'Travel Bags', 'Beach Bags', 'Work Bags', 'Shoulder Bags'];

  return (
    <div className={styles.sidebar}>
      <div className={styles.section}>
        <h3 className="typography-body-strong">Categories</h3>
        <ul className={styles.list}>
          {categories.map((cat, i) => (
            <li key={i} className={styles.listItem}>
              <a href="#" className={i === 0 ? styles.linkActive : styles.link}>
                {cat}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.section}>
        <h3 className="typography-body-strong">Price</h3>
        <div className={styles.priceInputs}>
          <input type="number" placeholder="Min" className={styles.input} />
          <span>-</span>
          <input type="number" placeholder="Max" className={styles.input} />
        </div>
        <button className={styles.applyBtn}>Apply</button>
      </div>
    </div>
  );
}
