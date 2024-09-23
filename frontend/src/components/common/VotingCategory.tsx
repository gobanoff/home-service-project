import React from "react";
import { useVoting } from "./VotingContext";
import styles from "./VotingCategory.module.scss";
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

const VotingCategory: React.FC = () => {
  const { options } = useVoting();

  const totalVotes = options.reduce((sum, option) => sum + option.rating, 0);
  return (
    <div className={styles.Voting}>
      <div className={styles.options}>
        {options.map((option) => (
          <div key={option._id} className={styles.option}>
            <span className={styles.category}>{option.name}</span>

            <span className={styles.votes}>{option.rating} </span>
            {totalVotes > 0 && (
              <span className={styles.percent}>
                (
                <span className={styles.red}>
                  {((option.rating / totalVotes) * 100).toFixed(1)}%
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
      <h2 className={styles.h2}>Category Rating</h2>
      <div className={styles.barchart}>
        <ResponsiveContainer 
       // width="150%" height={350}
        >
          <BarChart
            data={options}
            margin={{ top: 20, right: 0, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" fontWeight={"700"} />
            <YAxis fontWeight={"700"} />
            <Tooltip contentStyle={{ padding: "1rem" }} />
            <Legend />
            <Bar dataKey="rating" fill="#eaa00c" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default VotingCategory;
