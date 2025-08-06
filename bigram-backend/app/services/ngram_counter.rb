class NgramCounter
  # Initialize with text and n (default to 2 for bigrams) using keyword args.
  # Call #call to get a hash of n-grams and their counts.

  def initialize(text:, n: 2)
    @text = text
    @n = n
  end

  def call
    cleaned_text = scrub_text(@text)

    if cleaned_text.present? && cleaned_text.split.size >= @n
      return ngram_counts(ngrams_list(cleaned_text, @n))
    else
      return {}
    end
  end

  private
  def scrub_text(text) # depending on needs, get rid of punctuation, downcase, etc.
    text.gsub(/[^a-zA-Z\s]/, "").downcase.strip
  end

  def ngrams_list(text, n)
    text.split.each_cons(n).to_a
  end

  def ngram_counts(arr)
    counts = {}
    arr.each do |ngram|
      key = ngram.join(' ')
      counts[key] ||= 0
      counts[key] += 1
    end
    counts
  end
end