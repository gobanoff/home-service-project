import { CiSearch } from "react-icons/ci";
import Button from "./Button";
import SearchInput from "./SearchInput";
import styles from "./Hero.module.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { Business } from "../business/types";
import { Link } from "react-router-dom";

const Hero = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Business[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchExecuted, setSearchExecuted] = useState<boolean>(false);
  const [showNoResults, setShowNoResults] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const handleSearchClick = async (page = 1) => {
    if (query.trim().length > 0) {
      setLoading(true);
      setError(null);
      setSearchExecuted(true);

      try {
        const apiUrl = process.env.API_URL;
        const response = await axios.get<{
          businesses: Business[];
          page: number;
          totalPages: number;
        }>(
          // "http://localhost:3000/businesses/search",
          `${apiUrl}/businesses/search`,
          {
            params: { q: query, page, limit: 40 },
          }
        );

        setResults(response.data.businesses);
        setCurrentPage(response.data.page);
        setTotalPages(response.data.totalPages);

        if (response.data.businesses.length === 0) {
          setShowNoResults(true);
        }
      } catch (error) {
        setError("Error fetching search results");
        console.error("Error fetching search results", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (showNoResults) {
      const timer = setTimeout(() => {
        setShowNoResults(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [showNoResults]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handleSearchClick(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handleSearchClick(currentPage - 1);
    }
  };

  return (
    <div className={styles.hero}>
      <h1 className={styles.title}>
        Find Home <span className={styles.primary}>Service/Repair</span>
        <br />
        Near You
      </h1>
      <p className={styles.subtitle}>
        Explore Best Home Service & Repair near you
      </p>
      <div className={styles.searchContainer}>
        <SearchInput value={query} onChange={(e) => setQuery(e.target.value)} />
        <Button rounded onClick={() => handleSearchClick(1)} disabled={loading}>
          <div>
            <CiSearch fontSize={24} />
          </div>
        </Button>
      </div>
      <div className={styles.resultsContainer}>
        {loading && <p>Loading...</p>}
        {error && <p className={styles.error}>{error}</p>}

        {results.length > 0 ? (
          <>
            <ul className={styles.resultsList}>
              {results.map((business) => (
                <li key={business._id} className={styles.resultItem}>
                  <Link to={`/details/${business._id}`}>
                    <strong>{business.name}</strong>
                    <p>{business.category}</p>
                  </Link>
                </li>
              ))}
            </ul>

            <div className={styles.pagination}>
              <Button
                onClick={handlePreviousPage}
                disabled={currentPage === 1 || loading}
                pagination
              >
                Previous
              </Button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <Button
                onClick={handleNextPage}
                disabled={currentPage === totalPages || loading}
                pagination
              >
                Next
              </Button>
            </div>
          </>
        ) : (
          searchExecuted &&
          !loading &&
          showNoResults && (
            <p className={styles.noResults}>Search results not found</p>
          )
        )}
      </div>
    </div>
  );
};

export default Hero;
