require 'rails_helper'

RSpec.describe NgramCounter do
  describe "#call" do
    let(:text) { "Happy birthday dear bestie happy birthday to you, and many more" }

    context "when n is 2 (bigram)" do
      let(:n) { 2 }

      it "returns correct bigram counts" do
        counts = NgramCounter.new(text: text, n: n).call
        puts counts
        expect(counts).to include("happy birthday" => 2)
        expect(counts).to include("birthday dear" => 1)
      end
    end

    context "when text is empty" do
      it "returns an empty hash" do
        counts = NgramCounter.new(text: "").call
        expect(counts).to eq({})
      end
    end

    context "when n is greater than number of words" do
      it "returns an empty hash" do
        counts = NgramCounter.new(text: "hello world", n: 3).call
        expect(counts).to eq({})
      end
    end
  end
end