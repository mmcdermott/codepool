module RequestsHelper
  include ActsAsTaggableOn::TagsHelper

  def top_contributors(request)
    contributors = find_contributors(request)
    organized_contributors = organize_contributors(contributors)
  end

  def find_contributors(request)
    contributors = {}
    request.donations.each do |donation|
      if contributors.has_key?(donation.user)
        contributors[donation.user] += donation.amount
      else
        contributors[donation.user] = donation.amount
      end
    end
    contributors
  end

  def organize_contributors(contributors)
    contributors.delete(nil) if contributors.has_key?(nil)
    sorted_contributors = contributors.sort_by { |user, donation| donation}.reverse
    shortened_contributors = sorted_contributors[0..4]
  end

end
