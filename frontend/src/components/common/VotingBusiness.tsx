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
import Button from "./Button";

const VotingBusiness: React.FC = () => {
  const { services, totalPages, currentPage, setCurrentPage } = useVoting();

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  const totalRating = services.reduce(
    (sum, service) => sum + service.rating,
    0
  );
  return (
    <div className={styles.Service}>
      <div className={styles.options}>
        {services.map((service) => (
          <div key={service._id} className={styles.option}>
            <span className={styles.category}>{service.name}</span>

            <span className={styles.votes}>{service.rating}</span>
            {totalRating > 0 && (
              <span className={styles.percent}>
                (
                <span className={styles.red}>
                  {((service.rating / totalRating) * 100).toFixed(1)}%
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

      <div className={styles.businessListPagination}>
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          mini
        >
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          mini
        >
          Next
        </Button>
      </div>
      <h2 className={styles.h2}>Rating of Businesses</h2>
      <div className={styles.barchart}>
        <ResponsiveContainer
        // width="150%" height={350}
         >
          <BarChart
            data={services}
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

export default VotingBusiness;
