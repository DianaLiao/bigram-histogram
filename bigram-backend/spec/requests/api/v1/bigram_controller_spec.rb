require 'rails_helper'

RSpec.describe "Api::V1::Bigrams", type: :request do
  describe "POST /api/v1/bigrams_count" do
    let(:text) { "Happy birthday dear bestie happy birthday to you, and many more" }
    let(:valid_params) { { text: text, n: 2 } }

    context "with valid parameters" do
      it "returns a successful response with bigram counts" do
        post api_v1_bigrams_count_path, params: valid_params

        expect(response).to have_http_status(:success)
        json_response = JSON.parse(response.body)
        expect(json_response).to include("happy birthday" => 2)
        expect(json_response).to include("birthday dear" => 1)
      end
    end

    context "with invalid parameters" do
      it "returns an error for missing text" do
        post api_v1_bigrams_count_path, params: { n: 2 }

        expect(response).to have_http_status(:unprocessable_entity)
        json_response = JSON.parse(response.body)
        expect(json_response["error"]).to eq("Please enter at least 2 words of text.")
      end
    end
  end
end