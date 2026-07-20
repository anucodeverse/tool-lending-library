import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import Loading from "../components/Loading";

import { getTools } from "../services/toolService";

import styles from "./Dashboard.module.css";

import { useAuth } from "../context/useAuth";

function Dashboard() {

  const navigate = useNavigate();

  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

const {
 user
}=useAuth();



  // ==========================
  // FETCH DASHBOARD DATA
  // ==========================

  const fetchTools = async () => {

    try {

      setRefreshing(true);

      const data = await getTools();

      setTools(data.tools || []);

      console.log(
 "[Analytics] Dashboard data loaded"
);

    }

    catch (error) {

      console.error(error);

      toast.error(
        "Unable to load dashboard."
      );

    }

    finally {

      setLoading(false);
      setRefreshing(false);

    }

  };



  useEffect(() => {

  let ignore = false;


  const loadTools = async () => {

  await fetchTools();


  if(ignore) return;

};


  loadTools();


  return () => {

    ignore = true;

  };


}, []);




  // ==========================
  // DASHBOARD STATISTICS
  // ==========================

  const totalTools = tools.length;

  const availableTools =
    tools.filter(
      tool => tool.status === "Available"
    ).length;

  const borrowedTools =
    tools.filter(
      tool => tool.status === "Borrowed"
    ).length;

  const lowStockTools =
    tools.filter(
      tool => Number(tool.quantity) <= 5
    );

  const lowStock =
    lowStockTools.length;

  const totalQuantity =
    tools.reduce(

      (sum, tool) =>

        sum + Number(tool.quantity),

      0

    );



  const inventoryHealth =

    totalTools === 0

      ? 0

      : Math.round(

          (availableTools / totalTools) * 100

        );



  const recentTools =

    [...tools]

      .sort(

        (a, b) =>

          new Date(b.createdAt) -

          new Date(a.createdAt)

      )

      .slice(0, 5);




  // ==========================
  // LOADING STATE
  // ==========================

  if (loading) {

    return (

      <>

        <Navbar />

        <Loading />

      </>

    );

  }




  // ==========================
  // JSX STARTS HERE
  // ==========================

  return (

    <>

      <Navbar />

      <main

        className={styles.dashboard}

        id="main-content"

      >
              {/* ==========================
            HEADER
        ========================== */}

        <header className={styles.header}>

          <div>

            <h1>

              Welcome back, {user?.name || "User"} 👋

            </h1>

            <p className={styles.welcome}>

              Manage your inventory from one place.

            </p>

          </div>

          <button

            className={styles.refreshBtn}

            onClick={fetchTools}

            disabled={refreshing}

            aria-label="Refresh dashboard"

            aria-busy={refreshing}

          >

            {

              refreshing

                ? "Refreshing..."

                : "Refresh"

            }

          </button>

        </header>





        {/* ==========================
            SUMMARY CARDS
        ========================== */}

        <section

          className={styles.cardContainer}

          aria-labelledby="dashboard-summary"

        >

          <h2

            id="dashboard-summary"

            className={styles.visuallyHidden}

          >

            Dashboard Summary

          </h2>



          <section

            className={styles.card}

            aria-labelledby="total-tools"

          >

            <p className={styles.cardTitle}>
  Total Tools
</p>

            <p

              className={styles.cardValue}

              aria-label={`${totalTools} total tools`}

            >

              {totalTools}

            </p>

            <p>

              Registered inventory

            </p>

          </section>





          <section

            className={styles.card}

            aria-labelledby="available-tools"

          >

            <h3 id="available-tools">

              Available

            </h3>

            <p

              className={styles.cardValue}

              aria-label={`${availableTools} available tools`}

            >

              {availableTools}

            </p>

            <p>

              Ready to borrow

            </p>

          </section>





          <section

            className={styles.card}

            aria-labelledby="borrowed-tools"

          >

            <h3 id="borrowed-tools">

              Borrowed

            </h3>

            <p

              className={styles.cardValue}

              aria-label={`${borrowedTools} borrowed tools`}

            >

              {borrowedTools}

            </p>

            <p>

              Currently borrowed

            </p>

          </section>





          <section

            className={styles.card}

            aria-labelledby="low-stock"

          >

            <h3 id="low-stock">

              Low Stock

            </h3>

            <p

              className={styles.cardValue}

              aria-label={`${lowStock} low stock tools`}

            >

              {lowStock}

            </p>

            <p>

              Needs attention

            </p>

          </section>





          <section

            className={styles.card}

            aria-labelledby="total-quantity"

          >

            <h3 id="total-quantity">

              Total Quantity

            </h3>

            <p

              className={styles.cardValue}

              aria-label={`${totalQuantity} total quantity`}

            >

              {totalQuantity}

            </p>

            <p>

              Units in inventory

            </p>

          </section>

        </section>







        {/* ==========================
            ANALYTICS
        ========================== */}

        <section

          className={styles.analytics}

          aria-labelledby="analytics-title"

        >

          <h2

            id="analytics-title"

            className={styles.visuallyHidden}

          >

            Dashboard Analytics

          </h2>





          <section className={styles.analyticsCard}>

            <h3>

              Inventory Health

            </h3>



            <label

              htmlFor="inventoryHealth"

              className={styles.visuallyHidden}

            >

              Inventory Health Progress

            </label>



            <progress

              id="inventoryHealth"

              className={styles.progressNative}

              value={inventoryHealth}

              max={100}

            >

              {inventoryHealth}%

            </progress>



            <strong

              aria-live="polite"

            >

              {inventoryHealth}%

            </strong>

          </section>





          <section className={styles.analyticsCard}>

            <h3>

              Inventory Overview

            </h3>



            <div className={styles.statusRow}>

              <span className={styles.available}>

                Available : {availableTools}

              </span>



              <span className={styles.borrowed}>

                Borrowed : {borrowedTools}

              </span>



              <span className={styles.lowStock}>

                Low Stock : {lowStock}

              </span>

            </div>

          </section>

        </section>
                {/* ==========================
            QUICK ACTIONS
        ========================== */}

        <section

          className={styles.quick}

          aria-labelledby="quick-actions"

        >

          <h2 id="quick-actions">

            Quick Actions

          </h2>



          <div className={styles.quickButtons}>

            <button

              type="button"

              onClick={() => navigate("/tools")}

              aria-label="Go to Manage Tools page"

            >

              Manage Tools

            </button>



            <button

              type="button"

              onClick={fetchTools}

              disabled={refreshing}

              aria-label="Refresh dashboard data"

            >

              {

                refreshing

                  ? "Refreshing..."

                  : "Refresh Dashboard"

              }

            </button>

          </div>

        </section>







        {/* ==========================
            RECENT TOOLS
        ========================== */}

        <section

          className={styles.tableContainer}

          aria-labelledby="recent-tools"

        >

          <h2 id="recent-tools">

            Recent Tools

          </h2>



          {

            recentTools.length === 0

            ?

            (

              <div

                className={styles.empty}

                role="status"

                aria-live="polite"

              >

                <h3>

                  No tools found

                </h3>



                <p>

                  Add your first tool to begin managing inventory.

                </p>

              </div>

            )

            :

            (

              <table

                className={styles.table}

              >

                <caption className={styles.visuallyHidden}>

                  List of recently added tools

                </caption>



                <thead>

                  <tr>

                    <th scope="col">

                      Tool

                    </th>



                    <th scope="col">

                      Category

                    </th>



                    <th scope="col">

                      Status

                    </th>



                    <th scope="col">

                      Quantity

                    </th>

                  </tr>

                </thead>





                <tbody>

                  {

                    recentTools.map((tool) => (

                      <tr key={tool._id}>

                        <td>

                          {tool.name}

                        </td>



                        <td>

                          {tool.category}

                        </td>



                        <td>

                          <span

                            className={

                              tool.status === "Available"

                                ? styles.available

                                : styles.borrowed

                            }

                          >

                            {tool.status}

                          </span>

                        </td>



                        <td>

                          {tool.quantity}



                          {

                            Number(tool.quantity) <= 5 &&

                            (

                              <span

                                className={styles.lowWarning}

                                role="status"

                                aria-label="Low stock warning"

                              >

                                Low Stock

                              </span>

                            )

                          }

                        </td>

                      </tr>

                    ))

                  }

                </tbody>

              </table>

            )

          }

        </section>
              </main>

    </>

  );

}

export default Dashboard;