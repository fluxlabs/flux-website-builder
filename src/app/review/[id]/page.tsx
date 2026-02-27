"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "./review.module.css";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Magnetic from "@/components/ui/Magnetic";

export default function ReviewPage() {
  const { id } = useParams();
  const router = useRouter();
  const [intake, setIntake] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isApproving, setIsApproving] = useState(false);

  useEffect(() => {
    const fetchIntake = async () => {
      try {
        const res = await fetch(`/api/admin/intakes`);
        const data = await res.json();
        const item = data.find((i: any) => i.id === id);
        setIntake(item);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchIntake();
  }, [id]);

  const handleApprove = async () => {
    setIsApproving(true);
    try {
      await fetch("/api/admin/intakes", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: "approved" }),
      });
      router.push(`/review/${id}/success`);
    } catch (err) {
      console.error(err);
    } finally {
      setIsApproving(false);
    }
  };

  if (loading) return <div className={styles.loading}>Manifesting Review...</div>;
  if (!intake || !intake.staging_url) return <div className={styles.error}>Vision not found or not yet manifested.</div>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>
          Flux<span className={styles.logoHighlight}>Webs</span> Review
        </div>
        <div className={styles.clientInfo}>
          <span>Project: <strong>{intake.business_name}</strong></span>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.previewPane}>
          <div className={styles.browserFrame}>
            <div className={styles.browserHeader}>
              <div className={styles.dots}>
                <div className={styles.dot} />
                <div className={styles.dot} />
                <div className={styles.dot} />
              </div>
              <div className={styles.addressBar}>{intake.staging_url}</div>
            </div>
            <iframe 
              src={intake.staging_url} 
              className={styles.iframe}
              title="Staging Preview"
            />
          </div>
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.sidebarContent}>
            <h2>Final Review</h2>
            <p className={styles.desc}>
              Your vision has been manifested. Review your high-performance 
              website. If everything looks perfect, click below to initiate the launch sequence.
            </p>

            <div className={styles.specs}>
              <div className={styles.spec}>
                <label>Status</label>
                <div className={styles.statusBadge}>{intake.status.toUpperCase()}</div>
              </div>
              <div className={styles.spec}>
                <label>Performance</label>
                <div className={styles.perfValue}>100/100</div>
              </div>
            </div>

            <div className={styles.approvalArea}>
              <Magnetic intensity={0.2} style={{ width: '100%' }}>
                <button 
                  className={styles.approveBtn} 
                  onClick={handleApprove}
                  disabled={isApproving}
                >
                  {isApproving ? "Launching..." : "Approve & Launch 🚀"}
                </button>
              </Magnetic>
              <p className={styles.disclaimer}>
                By clicking, you approve this build for final deployment.
              </p>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
