export type NetworkCode = "MTN" | "TELECEL" | "AIRTELTIGO";

export type Database = {
  public: {
    Tables: {
      networks: {
        Row: {
          id: string;
          code: NetworkCode;
          name: string;
          active: boolean;
          created_at: string;
        };
      };
      bundles: {
        Row: {
          id: string;
          network_id: string;
          name: string;
          data_size: string;
          validity: string;
          price: number;
          original_price: number | null;
          discount: number | null;
          category: string;
          popular: boolean;
          in_stock: boolean;
          created_at: string;
          updated_at: string;
        };
      };
      orders: {
        Row: {
          id: string;
          order_code: string;
          user_id: string | null;
          bundle_id: string | null;
          network: NetworkCode;
          package_name: string;
          phone: string;
          amount: number;
          status: "PENDING" | "PROCESSING" | "DELIVERED" | "FAILED" | "REFUNDED";
          reference: string | null;
          promo_code: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          order_code: string;
          user_id?: string | null;
          bundle_id?: string | null;
          network: NetworkCode;
          package_name: string;
          phone: string;
          amount: number;
          status?: "PENDING" | "PROCESSING" | "DELIVERED" | "FAILED" | "REFUNDED";
          reference?: string | null;
          promo_code?: string | null;
        };
      };
      payment_verifications: {
        Row: {
          id: string;
          user_id: string | null;
          order_id: string | null;
          screenshot_url: string | null;
          transaction_id: string;
          reference: string;
          amount: number;
          network: string;
          phone: string;
          paid_at: string | null;
          status: "PENDING" | "APPROVED" | "REJECTED";
          review_note: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id?: string | null;
          order_id?: string | null;
          screenshot_url?: string | null;
          transaction_id: string;
          reference: string;
          amount: number;
          network: string;
          phone: string;
          paid_at?: string | null;
          status?: "PENDING" | "APPROVED" | "REJECTED";
        };
      };
    };
  };
};

export type BundleRow = Database["public"]["Tables"]["bundles"]["Row"] & {
  networks?: { code: NetworkCode; name: string } | null;
};
