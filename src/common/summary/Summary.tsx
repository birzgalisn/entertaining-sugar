import "./Summary.scss";

interface ISummary {
  title: string | number;
  desc: string | number;
}

const Summary: React.FC<ISummary> = ({ title, desc }) => {
  return (
    <div className="mp-summary">
      <h3 className="mp-summary-title">{title}</h3>
      <p className="mp-summary-desc">{desc}</p>
    </div>
  );
};

export default Summary;
