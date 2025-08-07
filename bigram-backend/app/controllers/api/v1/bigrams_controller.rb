class Api::V1::BigramsController < ApplicationController
  def count
    text = params[:text]

    if text.split.size < 2
      render json: { error: "Please enter at least 2 words of text." }, status: :bad_request
      return
    end

    begin
      counts = NgramCounter.new(text: text, n: 2).call
      render json: counts, status: :ok
    rescue StandardError => e
      Rails.logger.error("Error during ngram counter service call: #{e.message}")
      render json: { error: "An internal server error occurred during bigram analysis." },
                    status: :internal_server_error
    end
  end
end