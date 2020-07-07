import React, { useState, useContext, useCallback, useEffect } from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/Loader";
import LinksList from "../components/LinksList";

const LinksPage = (props) => {
  const [links, setLinks] = useState([]);
  const { loading, request } = useHttp();
  const { token } = useContext(AuthContext);

  const fetchLlinks = useCallback(async () => {
    try {
      const fetched = await request("/api/link", "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setLinks(fetched);
    } catch (e) {}
  }, [token, request]);

  useEffect(() => {
    fetchLlinks();
  }, [fetchLlinks]);

  if (loading) {
    return <Loader />;
  }

  return <>{!loading && <LinksList links={links} />}</>;
};

export default LinksPage;
