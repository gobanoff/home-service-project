import React from "react";
import { useVoting } from "./VotingContext";
import styles from "./VotingBusiness.module.scss";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const VotingBusiness: React.FC = () => {
  const { service, increaseService } = useVoting();

  const totalVotes = service.reduce((sum, option) => sum + option.votes, 0);

  return (
    <div className={styles.Service}>
      <div className={styles.options}>
        {service.map((option, index) => (
          <div key={index} className={styles.option}>
            <span className={styles.category}>{option.name}</span>
            <button
              className={styles.voteBtn}
              onClick={() => increaseService(index)}
            >
              Vote
            </button>
            <span className={styles.votes}>{option.votes} votes</span>
            {totalVotes > 0 && (
              <span className={styles.percent}>
                (
                <span className={styles.red}>
                  {((option.votes / totalVotes) * 100).toFixed(1)}%
                </span>
                )
              </span>
            )}
          </div>
        ))}
      </div>
      <div className={styles.addoption}>
        <input type="text" placeholder="Add new option" />
        <button className={styles.button}>Add</button>
      </div>
      <h2>Rating of Businesses</h2>
      <ResponsiveContainer width="150%" height={350}>
        <BarChart
          data={service}
          margin={{ top: 20, right: 0, left: 0, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="votes" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VotingBusiness;
